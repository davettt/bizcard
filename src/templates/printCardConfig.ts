import { TemplateId } from '../types'
import {
  MinimalTemplate,
  ClassicTemplate,
  ModernTemplate,
  ElegantTemplate,
  BoldTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
  SimpleTemplate,
} from './PrintCardTemplates'

export const templateComponents: Record<
  TemplateId,
  React.FC<{
    data: import('../types').CardData
    colors: string[]
    isBack?: boolean
  }>
> = {
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
  modern: ModernTemplate,
  elegant: ElegantTemplate,
  bold: BoldTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  simple: SimpleTemplate,
}

export const templateNames: Record<TemplateId, string> = {
  minimal: 'Minimal',
  classic: 'Classic',
  modern: 'Modern',
  elegant: 'Elegant',
  bold: 'Bold',
  creative: 'Creative',
  professional: 'Professional',
  simple: 'Simple',
}
