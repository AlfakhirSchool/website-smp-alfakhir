import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function formatPrivateKey(key: string | undefined) {
  if (!key) return undefined;
  let cleaned = key.replace(/"/g, '').replace(/\\n/g, '').replace(/\n/g, '');
  cleaned = cleaned.replace('-----BEGIN PRIVATE KEY-----', '').replace('-----END PRIVATE KEY-----', '').replace(/\s+/g, '');
  return `-----BEGIN PRIVATE KEY-----\n${cleaned.match(/.{1,64}/g)?.join('\n')}\n-----END PRIVATE KEY-----\n`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const getRows = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "data-pendaftaran!B4:B1000", // Start from row 4 because of headers
    });

    const numRows = getRows.data.values ? getRows.data.values.length : 0;
    const newId = numRows + 1;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "data-pendaftaran!B4:Y4",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            newId,
            new Date().toLocaleString("en-US", {
              timeZone: "Asia/Jakarta",
            }),
            body["nama-lengkap"],
            body["no-handphone"],
            body["jenis-kelamin"],
            body["tanggal-lahir"],
            body["tempat-lahir"],
            body["nik"],
            body["nisn"],
            body["nama-sekolah"],
            body["alamat-sekolah"],
            body["npsn-sekolah"],
            body["alamat-lengkap"],
            body["kota"],
            body["provinsi"],
            body["kode-pos"],
            body["nama-lengkap-orangtua"],
            body["no-handphone-orangtua"],
            body["nik-ayah"],
            body["nik-ibu"],
            body["pekerjaan-orangtua"],
            body["penghasilan-perbulan-orangtua"],
            body["payment-method"],
          ],
        ],
      },
    });

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
