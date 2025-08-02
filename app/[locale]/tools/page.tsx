"use client";

import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import UploadToolDialog from "@/components/upload-tool-dialog";
import InstallToolDialog from "@/components/install-tool-dialog";
import { useEffect, useState } from "react";
import { useToolsStore } from "@/store/tools";
import { useToolInstallation } from "@/hooks";
import ToolCard from "@/components/tool-card.";
import { Tool, ToolManifest } from "@/types/tools";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useGetTools } from "@/queries/useGetTools";

export default function ToolsPage() {
  const toolsTranslations = useTranslations("Tools");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [installDialogOpen, setInstallDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isUploadingTool, setIsUploadingTool] = useState(false);

  const tools = useToolsStore((state) => state.tools);
  const setTools = useToolsStore((state) => state.setTools);
  const { installTool } = useToolInstallation();

  const { data: toolsData, refetch: refetchTools } = useGetTools();

  useEffect(() => {
    if (toolsData) {
      const mappedTools = toolsData.data.map((tool: ToolManifest) => ({
        manifest: tool,
        workspaceIds: [],
      }));
      const toolsIds = new Set(tools.map((tool) => tool.manifest.id));
      const newTools = mappedTools.filter(
        (tool: Tool) => !toolsIds.has(tool.manifest.id),
      );
      setTools([...tools, ...newTools]);
    }
  }, [toolsData]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsUploadingTool(true);
    const response = await fetch("/api/tools/upload", {
      method: "POST",
      body: formData,
    });
    setIsUploadingTool(false);
    if (!response.ok) {
      toast.error(
        `${toolsTranslations(
          "uploadToolDialog.uploadError",
        )} ${response.statusText}`,
      );
      return;
    }

    toast.success(toolsTranslations("uploadToolDialog.uploadSuccess"));
    refetchTools();
    setUploadDialogOpen(false);
  };

  const handleInstallClick = (tool: Tool) => {
    setSelectedTool(tool);
    setInstallDialogOpen(true);
  };

  const handleInstall = (workspaceId: string) => {
    if (selectedTool) {
      installTool(selectedTool.manifest.id, workspaceId);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold mt-4">
            {toolsTranslations("title")}
          </h1>
          <p className="text-muted-foreground">
            {toolsTranslations("description")}
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <Input placeholder={toolsTranslations("searchToolsPlaceholder")} />
          </div>
          <div className="flex flex-col max-w-md gap-6">
            <p className="text-muted-foreground">
              {toolsTranslations("uploadToolLabel")}
            </p>
            <Button className="w-1/2" onClick={() => setUploadDialogOpen(true)}>
              <Upload className="w-4 h-4" />
              {toolsTranslations("uploadTool")}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.manifest.id}
              name={tool.manifest.name}
              description={tool.manifest.description}
              iconSrc={tool.manifest.icon}
              author={tool.manifest.author}
              onInstall={() => handleInstallClick(tool)}
              version={tool.manifest.version}
            />
          ))}
        </div>
      </div>
      <UploadToolDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        isUploading={isUploadingTool}
        onUpload={handleUpload}
      />
      <InstallToolDialog
        open={installDialogOpen}
        onOpenChange={setInstallDialogOpen}
        tool={selectedTool}
        onInstall={handleInstall}
      />
    </>
  );
}
