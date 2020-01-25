import {Author} from './author';

export interface Course {
  authors: Author[];
  id: number;
  date: string;
  description: string;
  name: string;
  length: number;
  isTopRated: boolean;
}
