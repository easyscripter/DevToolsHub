'use client'

import { useSettingsStore } from '@/store/settings'
import { SettingsRenderer } from '@/components/settings-renderer'

export default function Settings() {
	const { settings, updateGeneralSettings } = useSettingsStore()

	const handleSettingChange = (category: string, key: string, value: unknown) => {
		switch (category) {
			case 'general':
				const updatedSetting = {
					...settings.general[key as keyof typeof settings.general],
					value
				}
				updateGeneralSettings({ [key]: updatedSetting })
				break
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold mt-4">Settings</h1>
				<p className="text-muted-foreground">Manage your application preferences</p>
			</div>
			<SettingsRenderer settings={settings} onSettingChange={handleSettingChange} />
		</div>
	)
}