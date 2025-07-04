'use client'

import { AppSettings, SettingType } from '@/types'
import { SettingCategory } from './setting-category'
import { SettingItem } from './setting-item'
import { SettingControl } from './setting-control'
import { useTranslations } from 'next-intl'

type SettingsRendererProps = {
  settings: AppSettings
  onSettingChange: (category: string, key: string, value: unknown) => void
}

export function SettingsRenderer({ settings, onSettingChange }: SettingsRendererProps) {
  const settingsTranslations = useTranslations('Settings');
  const groupedSettings = Object.entries(settings).reduce((acc, [categoryKey, categorySettings]) => {
    const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
    
    const categoryItems = Object.entries(categorySettings).map(([settingKey, setting]) => ({
      key: settingKey,
      setting: setting as SettingType<unknown>
    }))

    acc[categoryName] = categoryItems
    return acc
  }, {} as Record<string, Array<{ key: string; setting: SettingType<unknown> }>>)

  return (
    <div className="flex w-full flex-col">
      {Object.entries(groupedSettings).map(([categoryName, categoryItems]) => (
        <SettingCategory key={categoryName} title={settingsTranslations(categoryName)}>
          {categoryItems.map(({ key, setting }) => (
            <SettingItem
              key={key}
              title={settingsTranslations(setting.title)}
              description={settingsTranslations(setting.description)}
            >
              <SettingControl
                setting={setting}
                value={setting.value}
                onChange={(value) => onSettingChange(categoryName.toLowerCase(), key, value)}
              />
            </SettingItem>
          ))}
        </SettingCategory>
      ))}
    </div>
  )
} 