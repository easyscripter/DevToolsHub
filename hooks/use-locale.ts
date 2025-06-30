import { useSettingsStore } from '@/store/settings'
import { LOCALES } from '@/constants'
import type { LocaleType } from '@/types'

export function useLocale() {
  const { settings, updateGeneralSettings } = useSettingsStore()
  const currentLocale = settings.general.language.value

  const setLocale = (locale: LocaleType) => {
    updateGeneralSettings({
      language: {
        ...settings.general.language,
        value: locale
      }
    })
  }

  const toggleLocale = () => {
    const newLocale = currentLocale === LOCALES.EN ? LOCALES.RU : LOCALES.EN
    setLocale(newLocale)
  }

  return {
    locale: currentLocale,
    setLocale,
    toggleLocale,
  }
} 