'use client';

import { useSettingsStore } from '@/store/settings';
import { SettingsRenderer } from '@/components/settings-renderer';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/hooks';
import { LocaleType } from '@/types';

export default function Settings() {
	const { settings, updateGeneralSettings } = useSettingsStore();
	const settingsTranslations = useTranslations('Settings');
	const { setLocale } = useLocale();

	const handleSettingChange = (
		category: string,
		key: string,
		value: unknown
	) => {
		switch (category) {
			case 'general':
				if (key === 'language') {
					setLocale(value as LocaleType);
				}
				const updatedSetting = {
					...settings.general[key as keyof typeof settings.general],
					value,
				};
				updateGeneralSettings({ [key]: updatedSetting });
				break;
		}
	};

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-3xl font-bold mt-4'>
					{settingsTranslations('title')}
				</h1>
				<p className='text-muted-foreground'>
					{settingsTranslations('description')}
				</p>
			</div>
			<SettingsRenderer
				settings={settings}
				onSettingChange={handleSettingChange}
			/>
		</div>
	);
}
