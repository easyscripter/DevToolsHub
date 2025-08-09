"use client";

import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import UploadToolDialog from "@/components/upload-tool-dialog";
import InstallToolDialog from "@/components/install-tool-dialog";
import { useState } from "react";
import { useToolsManagement } from "@/hooks";
import ToolCard from "@/components/tool-card.";
import { Tool } from "@/types/tools";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ToolsPage() {
  const toolsTranslations = useTranslations("Tools");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [installDialogOpen, setInstallDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const {
    tools,
    searchQuery,
    setSearchQuery,
    isLoading,
    uploadTool,
    installTool,
    isUploading,
  } = useToolsManagement();

  const handleUpload = async (file: File) => {
    try {
      await uploadTool(file);
      setUploadDialogOpen(false);
    } catch (error) {
      // Ошибка уже обработана в хуке
      console.error('Upload failed:', error);
    }
  };

  const handleInstallClick = (tool: Tool) => {
    setSelectedTool(tool);
    setInstallDialogOpen(true);
  };

  const handleInstall = (workspaceId: string) => {
    if (selectedTool) {
      installTool(selectedTool.manifest.id, workspaceId);
      setInstallDialogOpen(false);
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
            <Input 
              placeholder={toolsTranslations("searchToolsPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground">{toolsTranslations("uploadingTools")}</div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {tools.length > 0 ? (
              tools.map((tool) => (
                <ToolCard
                  key={tool.manifest.id}
                  name={tool.manifest.name}
                  description={tool.manifest.description}
                  iconSrc={tool.manifest.icon}
                  author={tool.manifest.author}
                  onInstall={() => handleInstallClick(tool)}
                  version={tool.manifest.version}
                />
              ))
            ) : (
              <div className="text-center py-8 w-full">
                <p className="text-muted-foreground">
                  {searchQuery ? toolsTranslations("searchToolsNotFound") : toolsTranslations("searchToolsNotAvailable")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <UploadToolDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        isUploading={isUploading}
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
