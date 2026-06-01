import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

function formatPrivateKey(key: string | undefined) {
  if (!key) return undefined;
  let cleaned = key.replace(/"/g, '').replace(/\\n/g, '').replace(/\n/g, '');
  cleaned = cleaned.replace('-----BEGIN PRIVATE KEY-----', '').replace('-----END PRIVATE KEY-----', '').replace(/\s+/g, '');
  return `-----BEGIN PRIVATE KEY-----\n${cleaned.match(/.{1,64}/g)?.join('\n')}\n-----END PRIVATE KEY-----\n`;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file found" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const drive = google.drive({
      auth,
      version: "v3",
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        ...(process.env.GOOGLE_DRIVE_FOLDER_ID ? { parents: [process.env.GOOGLE_DRIVE_FOLDER_ID] } : {}),
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
    });

    const fileId = response.data.id;

    if (!fileId) {
      throw new Error("File ID not found");
    }

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });

    return NextResponse.json({
      message: "Image uploaded successfully",
      url: result.data.webViewLink,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
