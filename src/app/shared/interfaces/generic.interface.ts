export interface GenericInterface {
  id?: number;
  creationDate: Date;
  updateDate: Date;
  deletedDate: Date;
}

export interface ResponseInterface {
  status: number;
  message: string;
  correlationId: string;
  data: any;
}
