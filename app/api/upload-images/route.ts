import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

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
        private_key: process.env.GOOGLE_PRIVATE_KEY
          ?.replace(/\\n/g, "\n")
          ?.replace(/^"|"$/g, "")
          ?.trim(),
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
