import { Tool, ToolsStore } from '@/types/tools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useToolsStore = create<ToolsStore>()(
  persist(
    (set) => ({
      tools: [],
      setTools: (tools) => set({ tools }),
      updateTools: (newSettings: Partial<Tool>) => {
        set((state) => ({
          tools: {
            ...state.tools,
            ...newSettings
          }
        }))
      },
      resetTools: () => {
        set({ tools: [] })
      }
    }),
    {
      name: 'app-tools',
      version: 1
    }
  )
) 