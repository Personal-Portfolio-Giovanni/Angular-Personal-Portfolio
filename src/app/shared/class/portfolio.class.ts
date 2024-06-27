import {
  PortfolioCourseInterface,
  PortfolioDataInterface,
  PortfolioProjectInterface,
  PortfolioWorkInterface,
} from '../interfaces/portfolio.interface';

export class PortfolioData implements PortfolioDataInterface {
  curriculum_url: string;
  profilePhoto_url: string;
  biography: string;
  work_projects: number;
  personal_projects: number;
  number_courses: number;
  works: Array<PortfolioWork>;

  constructor(
    curriculum_url: string,
    profilePhoto_url: string,
    biography: string,
    work_projects: number,
    personal_projects: number,
    number_courses: number,
    works: Array<PortfolioWork>
  ) {
    this.curriculum_url = curriculum_url;
    this.profilePhoto_url = profilePhoto_url;
    this.biography = biography;
    this.work_projects = work_projects;
    this.personal_projects = personal_projects;
    this.number_courses = number_courses;
    this.works = works;
  }
}

export class PortfolioWork implements PortfolioWorkInterface {
  identifier: string;
  title: string;
  from: string;
  to: string;
  role: string;
  where: string;
  description: string;

  constructor(
    identifier: string,
    title: string,
    from: string,
    to: string,
    role: string,
    where: string,
    description: string
  ) {
    this.identifier = identifier;
    this.title = title;
    this.from = from;
    this.to = to;
    this.role = role;
    this.where = where;
    this.description = description;
  }
}

export class PortfolioCourse implements PortfolioCourseInterface {
  identifier: string;
  title: string;
  from: string;
  to: string;
  role: string;
  where: string;
  description: string;

  constructor(
    identifier: string,
    title: string,
    from: string,
    to: string,
    role: string,
    where: string,
    description: string
  ) {
    this.identifier = identifier;
    this.title = title;
    this.from = from;
    this.to = to;
    this.role = role;
    this.where = where;
    this.description = description;
  }
}

export class PortfolioProject implements PortfolioProjectInterface {
  title: string;
  image: string;
  description: string;
  button_text: string;
  button_link: string;

  constructor(
    title: string,
    image: string,
    description: string,
    button_text: string,
    button_link: string
  ) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.button_text = button_text;
    this.button_link = button_link;
  }
}

export enum PortfolioConstant {
  LAST_UPDATE = 'last_update',
  PORTFOLIO_DATA = 'portfolio_data',
}
