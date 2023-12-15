import { Icons } from './Icons';
export type Data = {
  [K in keyof Icons]: Question;
};
export type Question = {
  question: string;
  choices?: string[];
  type: 'static' | 'dynamic';
};
