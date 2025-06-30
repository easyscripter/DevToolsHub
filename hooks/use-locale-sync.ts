import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSettingsStore } from '@/store/settings'
import { LOCALES } from '@/constants'

export function useLocaleSync() {
  const router = useRouter()
  const pathname = usePathname()
  const { settings } = useSettingsStore()
  const currentLocale = settings.general.language.value

  useEffect(() => {
    const pathnameHasLocale = Object.values(LOCALES).some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (!pathnameHasLocale) {
      const newPath = `/${currentLocale}${pathname}`
      router.replace(newPath)
    } else {
      const pathLocale = pathname.split('/')[1]
      if (pathLocale !== currentLocale) {
        const newPath = pathname.replace(`/${pathLocale}`, `/${currentLocale}`)
        router.replace(newPath)
      }
    }
  }, [currentLocale, pathname, router])

  return currentLocale
} 