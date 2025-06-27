'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useSettingsStore } from '@/store/settings'

export function useThemeSync() {
  const { theme: currentTheme, setTheme } = useTheme()
  const { settings } = useSettingsStore()
  
  const storeTheme = settings.general.theme.value

  useEffect(() => {
    if (storeTheme && storeTheme !== currentTheme) {
      setTheme(storeTheme)
    }
  }, [storeTheme, currentTheme, setTheme])

  return { currentTheme, setTheme }
} 