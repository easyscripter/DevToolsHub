import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const resources = {
	en: {
		translation: en,
	},
	ru: {
		translation: ru,
	},
};

if (typeof window !== 'undefined') {
	i18n
		.use(initReactI18next)
		.init({
			fallbackLng: 'en',
			resources,
			interpolation: {
				escapeValue: false,
			},
			detection: {
				order: [],
				caches: [],
			},
		});
} else {
	i18n.init({
		fallbackLng: 'en',
		resources,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: [],
			caches: [],
		},
	});
}

export default i18n;