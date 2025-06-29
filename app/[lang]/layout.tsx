'use client'

import { useParams } from 'next/navigation';
import { useSettingsStore } from '@/store/settings';
import { useEffect } from 'react';
import { LocaleType } from '@/types/settings';

export default function LocaleLayout({ children }: { children: React.ReactNode }) {

  const params = useParams();

	const { settings, updateGeneralSettings } = useSettingsStore();

	useEffect(() => {
		updateGeneralSettings({ language: {
			...settings.general.language,
			value: params.lang as LocaleType
		} });
	}, [params.lang, settings.general.language.value]);

	return <>{children}</>;
}