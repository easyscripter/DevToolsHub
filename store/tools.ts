import { ToolsStore } from "@/types/tools";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useToolsStore = create<ToolsStore>()(
  persist(
    (set) => ({
      tools: [
        {
          manifest: {
            id: "json-formatter",
            name: "JSON Formatter",
            description:
              "Format and validate JSON data with syntax highlighting",
            version: "1.0.0",
            author: "DevTools Hub",
            icon: "/assets/tools-icons/json-file.png",
            entrypoint: "/tools/json-formatter/index.html",
          },
          workspaceIds: [],
        },
        {
          manifest: {
            id: "uuid-generator",
            name: "UUID Generator",
            description: "Generate unique identifiers",
            version: "1.0.0",
            author: "DevTools Hub",
            icon: "/assets/tools-icons/uuid-generator.png",
            entrypoint: "/tools/uuid-generator/index.html",
          },
          workspaceIds: [],
        },
      ],
      setTools: (tools) => set({ tools }),
      updateTools: (newSettings) =>
        set((state) => ({
          tools: state.tools.map((tool) => ({ ...tool, ...newSettings })),
        })),
      installTool: (toolId: string, workspaceId: string) =>
        set((state) => ({
          tools: state.tools.map((tool) =>
            tool.manifest.id === toolId
              ? {
                  ...tool,
                  workspaceIds: [...(tool.workspaceIds || []), workspaceId],
                }
              : tool,
          ),
        })),
      uninstallTool: (toolId: string, workspaceId: string) =>
        set((state) => ({
          tools: state.tools.map((tool) =>
            tool.manifest.id === toolId
              ? {
                  ...tool,
                  workspaceIds: (tool.workspaceIds || []).filter(
                    (id) => id !== workspaceId,
                  ),
                }
              : tool,
          ),
        })),
    }),
    {
      name: "tools",
      version: 2,
    },
  ),
);
