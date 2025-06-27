import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppSettings, GeneralSettings, SettingsStore } from '@/types'
import { THEMES } from '@/constants'

const defaultSettings: AppSettings = {
  general: {
    theme: {
      title: 'Theme',
      description: 'Choose your preferred theme for the interface',
      value: THEMES.SYSTEM,
      category: 'general',
      controlType: 'select',
      options: [
        { label: THEMES.LIGHT, value: THEMES.LIGHT },
        { label: THEMES.DARK, value: THEMES.DARK },
        { label: THEMES.SYSTEM, value: THEMES.SYSTEM }
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
      version: 1
    }
  )
) 