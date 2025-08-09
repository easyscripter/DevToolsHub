import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import Ajv from "ajv";
import path from "path";
import * as fs from "fs/promises";
import { ToolManifest } from "@/types/tools";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/tools");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    const zip = await JSZip.loadAsync(Buffer.from(await file.arrayBuffer()));
    const isZipValid = validateZip(zip);

    if (!isZipValid) {
      return new Response("Invalid zip file", { status: 400 });
    }

    const manifestData = await zip.file("manifest.json")?.async("string");
    if (!manifestData) {
      return new Response("Manifest file not found", { status: 400 });
    }
    const manifest = JSON.parse(manifestData) as ToolManifest;
    if (!manifest) {
      return new Response("Invalid manifest file", { status: 400 });
    }

    const isManifestValid = validateManifest(manifest);

    if (!isManifestValid) {
      return new Response("Invalid manifest file", { status: 400 });
    }

    const folderName = manifest.id;
    const destPath = path.join(UPLOAD_DIR, folderName);

    await fs.mkdir(destPath, { recursive: true });
    await Promise.all(
      ["manifest.json", "index.html"].map(async (filename) => {
        const entry = zip.file(filename);
        if (!entry) return;
        const content = await entry.async("nodebuffer");
        await fs.writeFile(path.join(destPath, filename), content);
      }),
    );

    return NextResponse.json({
      success: true,
      message: "Tool uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

function validateZip(zip: JSZip): boolean {
  const manifestEntry = zip.file("manifest.json");
  const indexEntry = zip.file("index.html");

  if (!manifestEntry || !indexEntry) {
    return false;
  }

  return true;
}

function validateManifest(manifest: unknown) {
  const ajv = new Ajv();

  const manifestSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      version: { type: "string" },
      author: { type: "string" },
      icon: { type: "string" },
      entrypoint: { type: "string" },
    },
    required: [
      "id",
      "name",
      "description",
      "version",
      "author",
      "icon",
      "entrypoint",
    ],
    additionalProperties: false,
  };

  const validate = ajv.compile(manifestSchema);
  return validate(manifest);
}
