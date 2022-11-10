export class ErrorResponse {
  correlationId?: string;
  dateTime?: Date;
  error?: Error;
  url?: string;
}

export class Error {
  exceptionCode?: string;
  exceptionName?: string;
  message?: string;
  status?: string;
}
