import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file found" }, { status: 400 });
    }

    // Convert file to base64 for ImgBB
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Prepare ImgBB payload
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", base64Image);

    // Send to ImgBB
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error("IMGBB_API_KEY is missing in environment variables.");
    }

    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    const result = await imgbbResponse.json();

    if (!imgbbResponse.ok) {
      throw new Error(result.error?.message || "Failed to upload image to ImgBB");
    }

    return NextResponse.json({
      message: "Image uploaded successfully",
      url: result.data.url, // ImgBB provides a direct URL
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
