import {
  GenericInterface,
  ResponseInterface,
} from '../interfaces/generic.interface';

export class GenericModel implements GenericInterface {
  id: number;
  creationDate: Date;
  updateDate: Date;
  deletedDate: Date;

  constructor(
    id: number,
    creationDate: Date,
    updateDate: Date,
    deletedDate: Date
  ) {
    this.id = id;
    this.creationDate = creationDate;
    this.updateDate = updateDate;
    this.deletedDate = deletedDate;
  }
}

export class ResponseModel implements ResponseInterface {
  status: number;
  message: string;
  correlationId: string;
  data: any;

  constructor(
    status: number,
    message: string,
    correlationId: string,
    data: any
  ) {
    this.status = status;
    this.message = message;
    this.correlationId = correlationId;
    this.data = data;
  }
}
