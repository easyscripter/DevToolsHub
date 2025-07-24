"use client";

import WorkspaceCard from "@/components/workspace-card";
import WorkspaceDialog from "@/components/workspace-dialog";
import { useWorkspacesStore } from "@/store/workspaces";
import React, { useState } from "react";
import { FolderIcon, PlusIcon } from "lucide-react";
import { workspaceIcons } from "@/config";
import { Workspace } from "@/types/workspace";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/delete-dialog";
import { useRouter } from "next/navigation";
import AddNewCard from "@/components/add-new-card";
import { useTranslations } from "next-intl";
import { useVersionCheck } from "@/hooks";
import { ChangeLogModal } from "@/components/changelog-dialog";

export default function Workspaces() {
  const workspacesTranslations = useTranslations("Workspaces");
  const deleteWorkspaceDialogTranslations = useTranslations(
    "Workspaces.deleteWorkspaceDialog",
  );
  const { workspaces, createWorkspace, deleteWorkspace } = useWorkspacesStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workspaceIdToDelete, setWorkspaceIdToDelete] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const getIconComponent = (iconName: string) => {
    const iconOption = workspaceIcons.find((icon) => icon.value === iconName);
    return iconOption ? iconOption.icon : FolderIcon;
  };

  const { showModal, close, changeLog } = useVersionCheck();

  const handleCreateWorkspace = (workspace: Workspace) => {
    createWorkspace(workspace);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold mt-4">
          {workspacesTranslations("title")}
        </h1>
        <p className="text-muted-foreground">
          {workspacesTranslations("description")}
        </p>
      </div>
      <div className="flex gap-4 w-full flex-wrap">
        {workspaces.length > 0 ? (
          <>
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                id={workspace.id}
                icon={React.createElement(getIconComponent(workspace.icon), {
                  className: "w-10 h-10",
                })}
                name={workspace.name}
                description={workspace.description}
                onDelete={() => {
                  setWorkspaceIdToDelete(workspace.id);
                  setIsDeleteDialogOpen(true);
                }}
                onClick={() => router.push(`/workspaces/${workspace.id}`)}
              />
            ))}
            <AddNewCard
              title={workspacesTranslations("createWorkspace")}
              icon={<PlusIcon className="w-10 h-10" />}
              onClick={() => setIsDialogOpen(true)}
            />
          </>
        ) : (
          <div className="flex flex-col gap-8">
            <p className="text-muted-foreground">
              {workspacesTranslations("workspaceNotFound")}
            </p>
            <Button
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              className="w-fit"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              {workspacesTranslations("createWorkspace")}
            </Button>
          </div>
        )}
      </div>
      <WorkspaceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateWorkspace={handleCreateWorkspace}
      />
      <DeleteDialog
        title={deleteWorkspaceDialogTranslations("title")}
        description={deleteWorkspaceDialogTranslations("description")}
        open={isDeleteDialogOpen}
        okButtonText={deleteWorkspaceDialogTranslations("delete")}
        cancelButtonText={deleteWorkspaceDialogTranslations("cancel")}
        onOk={() => {
          deleteWorkspace(workspaceIdToDelete!);
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />

      <ChangeLogModal
        open={showModal}
        onClose={close}
        title="ChangeLog"
        changeLog={changeLog}
      />
    </div>
  );
}
