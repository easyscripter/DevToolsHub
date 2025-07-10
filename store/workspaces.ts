import { create } from 'zustand';
import { Workspace, WorkspacesStore } from '@/types/workspace';
import { persist } from 'zustand/middleware';

export const useWorkspacesStore = create<WorkspacesStore>()(
	persist(
		set => ({
			workspaces: [],
			createWorkspace: (workspace: Workspace) => {
				set(state => ({
					workspaces: [...state.workspaces, workspace],
				}));
			},
			updateWorkspace: (workspace: Workspace) => {
				set(state => ({
					workspaces: state.workspaces.map(w =>
						w.id === workspace.id ? workspace : w
					),
				}));
			},
			deleteWorkspace: (id: string) => {
				set(state => ({
					workspaces: state.workspaces.filter(w => w.id !== id),
				}));
			},
		}),
		{
			name: 'workspaces',
			version: 1,
		}
	)
);
