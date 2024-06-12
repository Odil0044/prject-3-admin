import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import fetch from "node-fetch";
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req) {
  try {
    
    const formData = await req.formData();
    const file = formData.get("file");
    const context = formData.get("context");
    const title = formData.get("title");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "my_website_images",
            tags: ["website_image", "example"],
            context:
              `alt=${title}|caption=${context}`,
          },

          function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    }); 

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/images`,
      {
        img_url: result.url,
        title: result.context.custom.alt,
        context: result.context.custom.caption,
        file_name: result.original_filename,
        width: result.width,
        height: result.height,
        format: result.format,
        folder: result.asset_folder,
        bytes: result.bytes,
      }
    );

    return NextResponse.json(
      { success: true, data:res.data, result },
  
    );
  } catch (error) {
    console.log("Error processing form data:", error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
