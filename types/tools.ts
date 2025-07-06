export type Tool = {
	manifest: ToolManifest;
	workspaceId: string;
}

export type ToolManifest = {
	id: string;
	name: string;
	description: string;
	version: string;
	author: string;
	icon: string;
	entrypoint: string;
}

export type ToolsStore = {
	tools: Tool[];
	setTools: (tools: Tool[]) => void;
	updateTools: (newSettings: Partial<Tool>) => void;
	resetTools: () => void;
}