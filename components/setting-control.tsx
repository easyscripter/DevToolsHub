'use client'

import { SettingType } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { useTranslate } from '@/hooks/use-translate'

type SettingControlProps<T> = {
  setting: SettingType<T>
  value: T
  onChange: (value: T) => void
}

export function SettingControl<T>({ setting, value, onChange }: SettingControlProps<T>) {
  const { t } = useTranslate();
  
  const renderControl = () => {
    switch (setting.controlType) {
      case 'select':
        return (
          <Select value={String(value)} onValueChange={(newValue) => onChange(newValue as T)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={String(option.value)} value={String(option.value)}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'switch':
        return (
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked as T)}
          />
        )

      case 'input':
        return (
          <Input
            type="text"
            value={String(value)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value as T)}
            placeholder={setting.placeholder}
            className="w-[180px]"
          />
        )

      case 'textarea':
        return (
          <Textarea
            value={String(value)}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value as T)}
            placeholder={setting.placeholder}
            className="w-[300px]"
          />
        )

      case 'slider':
        return (
          <div className="w-[180px]">
            <Slider
              value={[Number(value)]}
              onValueChange={([newValue]) => onChange(newValue as T)}
              min={setting.min}
              max={setting.max}
              step={setting.step}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {String(value)}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return renderControl()
} 