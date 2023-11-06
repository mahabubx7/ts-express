export interface MailAttachMents {
  filename: string
  path: string
}

export interface mailDataOptions {
  from?: string
  to: string | undefined
  cc?: string
  bcc?: string
  subject: string
  text?: string
  html: string,
  attachments?: MailAttachMents[],
}

