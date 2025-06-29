import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppSettings, GeneralSettings, SettingsStore } from '@/types'
import { LOCALES, THEMES } from '@/constants'

const defaultSettings: AppSettings = {
  general: {
    theme: {
      title: 'Settings.theme.title',
      description: 'Settings.theme.description',
      value: THEMES.SYSTEM,
      category: 'general',
      controlType: 'select',
      options: [
        { label: 'Settings.theme.options.light', value: THEMES.LIGHT },
        { label: 'Settings.theme.options.dark', value: THEMES.DARK },
        { label: 'Settings.theme.options.system', value: THEMES.SYSTEM }
      ]
    },
    language: {
      title: 'Settings.language.title',
      description: 'Settings.language.description',
      value: LOCALES.EN,
      category: 'general',
      controlType: 'select',
      options: [
        { label: 'Settings.language.options.en', value: LOCALES.EN },
        { label: 'Settings.language.options.ru', value: LOCALES.RU }
      ]
    }
  }
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      
      updateGeneralSettings: (newSettings: Partial<GeneralSettings>) => {
        set((state) => ({
          settings: {
            ...state.settings,
            general: {
              ...state.settings.general,
              ...newSettings
            }
          }
        }))
      },
      resetSettings: () => {
        set({ settings: defaultSettings })
      }
    }),
    {
      name: 'app-settings',
      version: 2
    }
  )
) 