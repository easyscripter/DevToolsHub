import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppSettings, GeneralSettings, SettingsStore } from '@/types'
import { LOCALES, THEMES } from '@/constants'

const defaultSettings: AppSettings = {
  general: {
    theme: {
      title: 'theme.title',
      description: 'theme.description',
      value: THEMES.SYSTEM,
      category: 'general',
      controlType: 'select',
      options: [
        { label: 'theme.options.light', value: THEMES.LIGHT },
        { label: 'theme.options.dark', value: THEMES.DARK },
        { label: 'theme.options.system', value: THEMES.SYSTEM }
      ]
    },
    language: {
      title: 'language.title',
      description: 'language.description',
      value: LOCALES.EN,
      category: 'general',
      controlType: 'select',
      options: [
        { label: 'language.options.en', value: LOCALES.EN },
        { label: 'language.options.ru', value: LOCALES.RU }
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