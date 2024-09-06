export class EmailSenderModel {
  cc?: string;
  bbc?: string;
  from?: string;
  replyTo?: string;
  sentDate?: Date;
  subject?: string;
  text?: string;
  to?: string;
  params?: Map<string, string>;
}

export class EmailResponseModel {
  timestamp?: Date;
  message?: string;
}

export class EmailTemplateModel {
  identification?: string;
  subject?: string;
  metadata?: Array<string>;
  locale?: string;
  content?: string;
}

export enum TemplateConstant {
  EMAIL_NAME = '{{NAME}}',
  EMAIL_COPY = '{{EMAIL_COPY}}',
  SITE_SHORT = '{{SITE_SHORT}}',
}
