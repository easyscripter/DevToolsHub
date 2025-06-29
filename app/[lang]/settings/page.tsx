'use client'

import { useSettingsStore } from '@/store/settings'
import { SettingsRenderer } from '@/components/settings-renderer'
import { useTranslate } from '@/hooks/use-translate'
import { usePathname, useRouter } from 'next/navigation';
import { LocaleType } from '@/types/settings';

export default function Settings() {
	const { settings, updateGeneralSettings } = useSettingsStore();
	const { t } = useTranslate();
	const router = useRouter();
	const pathname = usePathname();

	const handleSettingChange = (category: string, key: string, value: unknown) => {
		switch (category) {
			case 'general':
				if (key === 'language') {
					const updatedSetting = {
						...settings.general.language,
						value: value as LocaleType
					}
					updateGeneralSettings({ language: updatedSetting });
					const newPath = pathname.replace(/^\/[a-z]{2}/, `/${value as LocaleType}`);
					router.push(newPath);
				}
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
				<h1 className="text-3xl font-bold mt-4">{t('Settings.title')}</h1>
				<p className="text-muted-foreground">{t('Settings.description')}</p>
			</div>
			<SettingsRenderer settings={settings} onSettingChange={handleSettingChange} />
		</div>
	)
}