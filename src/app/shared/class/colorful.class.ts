import { WorkInterface } from '../interfaces/work.interface';

export class Contentful {
  items?: Item[];
}

export class Item {
  updatedAt?: Date;
  sys: any;
  fields?: CMSData;
  cmsData?: CMSData[];
}
export class CMSData implements WorkInterface {
  id?: number;
  title?: string;
  from?: string;
  to?: string;
  role?: string;
  where?: string;
  descriptionValue?: Description;
  description?: string;
  identifier?: string;
}

export class Description {
  nodeType?: string;
  data?: any;
  content?: Content[];
}

export class Content {
  nodeType?: string;
  data: any;
  value?: string;
  content?: Content[];
}

export enum ContentfulConstant {
  WORKS_DATA = 'works_data',
  COURSE_DATA = 'course_data',
}

export enum Locale {
  ITALIAN = 'it-IT',
  ENGLISH = 'en-GB',
}
