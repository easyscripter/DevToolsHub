'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export const useTranslate = () => {
  const { t, i18n } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const safeT = (key: string, options?: Record<string, unknown>) => {
    if (!isClient) {
      return key
    }
    return t(key, options)
  }

  return {
    t: safeT,
    i18n,
    isClient
  }
} 