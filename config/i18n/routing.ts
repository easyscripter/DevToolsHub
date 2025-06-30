import { LOCALES } from '@/constants';
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	localePrefix: "as-needed",
	locales: Object.values(LOCALES),
	defaultLocale: LOCALES.EN,
	localeDetection: false,
});