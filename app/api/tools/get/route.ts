import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const toolsPath = path.join(process.cwd(), "public", "tools");
    const toolsFolder = await fs.promises.readdir(toolsPath);
    const tools = await Promise.all(
      toolsFolder.map(async (toolName) => {
        const toolPath = path.join(toolsPath, toolName);
        const manifest = await fs.promises.readFile(
          path.join(toolPath, "manifest.json"),
          "utf-8",
        );
        return JSON.parse(manifest);
      }),
    );
    return NextResponse.json({
      success: true,
      message: "Tools fetched successfully",
      data: tools,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch tools",
    });
  }
}
