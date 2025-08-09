"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useWorkspacesStore } from "@/store/workspaces";
import { useToolsManagement } from "@/hooks";
import InlineEditField from "@/components/inline-edit-field";
import { useTranslations } from "next-intl";
import ToolCard from "@/components/tool-card.";

type WorkspaceParams = {
  workspaceId: string;
};

export default function Workspace() {
  const { workspaceId } = useParams<WorkspaceParams>();
  const { workspaces, updateWorkspace } = useWorkspacesStore();
  const { getToolsForWorkspace, uninstallTool } = useToolsManagement();
  const workspacesTranslations = useTranslations("Workspaces");
  
  const workspace = workspaces.find(
    (workspace) => workspace.id === workspaceId,
  );

  const installedTools = workspace ? getToolsForWorkspace(workspace.id) : [];

  const handleUpdateName = (name: string) => {
    if (workspace) {
      updateWorkspace({
        ...workspace,
        name,
      });
    }
  };

  const handleUpdateDescription = (description: string) => {
    if (workspace) {
      updateWorkspace({
        ...workspace,
        description,
      });
    }
  };

  if (!workspace) {
    return <div>{workspacesTranslations("workspaceNotFound")}</div>;
  }

  const handleRunTool = (toolId: string) => {
    window.location.href = `/tools/${toolId}`;
  };

  const handleUninstallTool = (toolId: string) => {
    if (workspace) {
      uninstallTool(toolId, workspace.id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mt-4">
        <div className="max-w-1/4">
          <InlineEditField
            value={workspace.name}
            onSave={handleUpdateName}
            placeholder={workspacesTranslations(
              "createWorkspaceDialog.namePlaceholder",
            )}
            maxLength={20}
            className="text-3xl font-bold"
          />
        </div>
        <div className="max-w-1/4">
          <InlineEditField
            value={workspace.description}
            onSave={handleUpdateDescription}
            placeholder={workspacesTranslations(
              "createWorkspaceDialog.descriptionPlaceholder",
            )}
            maxLength={50}
            className="text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">
          {workspacesTranslations("installedTools")}
        </h2>
        {installedTools.length === 0 ? (
          <p className="text-muted-foreground">
            {workspacesTranslations("noToolsInstalled")}
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {installedTools.map((tool) => (
              <ToolCard
                key={tool.manifest.id}
                name={tool.manifest.name}
                description={tool.manifest.description}
                iconSrc={tool.manifest.icon}
                author={tool.manifest.author}
                version={tool.manifest.version}
                variant="workspace"
                onInstall={() => {}}
                onRun={() => handleRunTool(tool.manifest.id)}
                onUninstall={() => handleUninstallTool(tool.manifest.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
