import { useToolsStore } from '@/store/tools';

export const useToolInstallation = () => {
	const installTool = useToolsStore(state => state.installTool);
	const uninstallTool = useToolsStore(state => state.uninstallTool);

	return {
		installTool,
		uninstallTool,
	};
};
