export class EmailSenderModel {
  cc?: string;
  bbc?: string;
  from?: string;
  replyTo?: string;
  sentDate?: Date;
  subject?: string;
  text?: string;
  to?: string;
}

export class EmailResponseModel {
  timestamp?: Date;
  message?: string;
}

export class EmailTemplateModel {
  identification?: string;
  metadata?: Array<string>;
  content?: string;
}

export enum TemplateConstant {
  NAME = '$NAME$',
  TITLE = '$TITLE$',
  SUBTITLE = '$SUBTITLE$',
  EMAIL_TEXT = '$EMAIL_TEXT$',
  IMPORTANT_TEXT = '$IMPORTANT_TEXT$',
  THANKS = '$THANKS$',
}
