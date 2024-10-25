export interface PortfolioDataInterface {
  curriculum_url: string;
  profilePhoto_url: string;
  biography: string;
  cookie_policy: string;
  work_projects: number;
  personal_projects: number;
  number_courses: number;
}

export interface PortfolioWorkInterface {
  identifier: string;
  title: string;
  from: string;
  to: string;
  role: string;
  where: string;
  description: string;
}

export interface PortfolioCourseInterface {
  identifier: string;
  title: string;
  from: string;
  to: string;
  role: string;
  where: string;
  description: string;
}

export interface PortfolioProjectInterface {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  button_text: string;
  button_link: string;
}
