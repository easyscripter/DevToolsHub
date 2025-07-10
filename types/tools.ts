export type Tool = {
	manifest: ToolManifest;
	workspaceIds: string[];
};

export type ToolManifest = {
	id: string;
	name: string;
	description: string;
	version: string;
	author: string;
	icon: string;
	entrypoint: string;
};

export type ToolsStore = {
	tools: Tool[];
	setTools: (tools: Tool[]) => void;
	updateTools: (newSettings: Partial<Tool>) => void;
	installTool: (toolId: string, workspaceId: string) => void;
	uninstallTool: (toolId: string, workspaceId: string) => void;
};
