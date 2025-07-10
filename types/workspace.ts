export type Workspace = {
	id: string;
	name: string;
	icon: string;
	description: string;
	tools: string[];
};

export type WorkspacesStore = {
	workspaces: Workspace[];
	createWorkspace: (workspace: Workspace) => void;
	updateWorkspace: (workspace: Workspace) => void;
	deleteWorkspace: (id: string) => void;
};
