'use client'

import { useThemeSync } from '@/hooks/use-theme-sync'

type ThemeSyncWrapperProps = {
  children: React.ReactNode
}

export function ThemeSyncWrapper({ children }: ThemeSyncWrapperProps) {
  useThemeSync()
  
  return <>{children}</>
} 