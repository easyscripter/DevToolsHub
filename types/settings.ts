import { THEMES } from "@/constants"

export type Theme = (typeof THEMES)[keyof typeof THEMES]

export type SettingControlType = 'select' | 'switch' | 'input' | 'textarea' | 'slider'

export type SettingOption = {
  label: string
  value: string | number | boolean
}

export type SettingType<T> = {
	title: string;
	description: string;
	value: T;
	category: string;
	controlType: SettingControlType;
	options?: SettingOption[];
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
}

export type GeneralSettings = {
  theme: SettingType<Theme>
}

export type AppSettings = {
  general: GeneralSettings
}

export type SettingsStore = {
  settings: AppSettings
  updateGeneralSettings: (settings: Partial<GeneralSettings>) => void
  resetSettings: () => void
} 