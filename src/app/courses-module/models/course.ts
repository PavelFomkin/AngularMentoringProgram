import {Author} from './author';

export interface Course {
  authors: Author[];
  id: number;
  date: Date;
  description: string;
  name: string;
  length: number;
  isTopRated: boolean;
}
