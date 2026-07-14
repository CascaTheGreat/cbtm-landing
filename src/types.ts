export interface IMenuItem {
  text: string;
  url: string;
}

export interface IBenefit {
  title: string;
  description: string;
  imageSrc: string;
  bullets: IBenefitBullet[];
}

export interface IBenefitBullet {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface IPricing {
  name: string;
  price: number | string;
  features: string[];
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ITestimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

export interface IStats {
  title: string;
  icon: JSX.Element;
  description: string;
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  x?: string;
  [key: string]: string | undefined;
}

export type Event = {
  id: number;
  host: number;
  name: string;
  description: string;
  start_time: string; //2026-07-14 01:51:49+00 ISO format
  end_time: string;
  location: number;
  popularity?: number;
  sublocation?: number;
  action_link?: string;
};

export type POI = {
  id: number;
  name: string;
};
