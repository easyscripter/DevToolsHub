import { useMemo, useCallback, useState } from 'react';
import { useToolsStore } from '@/store/tools';
import { useGetTools } from '@/queries/useGetTools';
import { useDebounceSearch } from './use-debounced-search';
import { toast } from 'sonner';
import { Tool, ToolManifest } from '@/types';
import { useTranslations } from 'next-intl';

export function useToolsManagement() {
  const { tools, installTool, uninstallTool } = useToolsStore();
  const { data: remoteTools, isLoading, error, refetch } = useGetTools();
	const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations('Tools');


  const allTools = useMemo(() => {
    if (!remoteTools || !remoteTools.data) return tools;

    const remoteToolsData = remoteTools.data as ToolManifest[];
    const remoteToolsMap = new Map(remoteToolsData.map((tool: ToolManifest) => [tool.id, tool]));
    const localToolsMap = new Map(tools.map(tool => [tool.manifest.id, tool]));

    const mergedTools: Tool[] = tools.map(localTool => {
      const remoteTool = remoteToolsMap.get(localTool.manifest.id);
      if (remoteTool) {
        return {
          ...localTool,
          manifest: remoteTool,
        };
      }
      return localTool;
    });

    remoteToolsData.forEach((remoteTool: ToolManifest) => {
      if (!localToolsMap.has(remoteTool.id)) {
        mergedTools.push({
          manifest: remoteTool,
          workspaceIds: [],
        });
      }
    });

    return mergedTools;
  }, [tools, remoteTools]);

  const searchTools = useCallback((tools: Tool[], query: string) => {
    if (!query.trim()) return tools;

    const lowercaseQuery = query.toLowerCase();
    
    return tools.filter(tool => 
      tool.manifest.name.toLowerCase().includes(lowercaseQuery) ||
      tool.manifest.description.toLowerCase().includes(lowercaseQuery) ||
      tool.manifest.author.toLowerCase().includes(lowercaseQuery)
    );
  }, []);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasQuery,
  } = useDebounceSearch(allTools, searchTools);

  const uploadTool = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/tools/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      await refetch();
      toast.success(t('uploadToolDialog.uploadSuccess'));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('uploadToolDialog.uploadError');
      toast.error(errorMessage);
      throw error;
    }
    finally {
      setIsUploading(false);
    }
  }, [refetch]);

  const handleInstallTool = useCallback((toolId: string, workspaceId: string) => {
    try {
      installTool(toolId, workspaceId);
    } catch {
      toast.error(t('installToolDialog.installError'));
    }
  }, [installTool]);

  const handleUninstallTool = useCallback((toolId: string, workspaceId: string) => {
      uninstallTool(toolId, workspaceId);
  }, [uninstallTool]);

  const getToolsForWorkspace = useCallback((workspaceId: string) => {
    return allTools.filter(tool => 
      tool.workspaceIds.includes(workspaceId)
    );
  }, [allTools]);

  const getAvailableToolsForWorkspace = useCallback((workspaceId: string) => {
    return allTools.filter(tool => 
      !tool.workspaceIds.includes(workspaceId)
    );
  }, [allTools]);

  return {
    tools: searchResults,
    allTools,
    isLoading,
    isSearching,
    hasQuery,
    error,
    searchQuery,
    setSearchQuery,
    uploadTool,
    installTool: handleInstallTool,
    uninstallTool: handleUninstallTool,
    getToolsForWorkspace,
    getAvailableToolsForWorkspace,
    refetch,
    isUploading,
  };
}
