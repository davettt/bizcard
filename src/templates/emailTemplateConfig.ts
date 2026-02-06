import React from 'react'
import { EmailTemplateId, EmailSignatureData } from '../types'
import {
  SimpleEmailTemplate,
  ModernEmailTemplate,
  ProfessionalEmailTemplate,
  CreativeEmailTemplate,
} from './EmailTemplates'

export const emailTemplateComponents: Record<
  EmailTemplateId,
  React.FC<{
    data: EmailSignatureData
    colors: string[]
  }>
> = {
  simple: SimpleEmailTemplate,
  modern: ModernEmailTemplate,
  professional: ProfessionalEmailTemplate,
  creative: CreativeEmailTemplate,
}

export const emailTemplateNames: Record<EmailTemplateId, string> = {
  simple: 'Simple',
  modern: 'Modern',
  professional: 'Professional',
  creative: 'Creative',
}
