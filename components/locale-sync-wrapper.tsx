'use client'

import { useLocaleSync } from '@/hooks'

type LocaleSyncWrapperProps = {
  children: React.ReactNode
}

export function LocaleSyncWrapper({ children }: LocaleSyncWrapperProps) {
	useLocaleSync()

	return <>{children}</>
} 