import { Post } from './post';
import { User } from './user';

export interface Recipe {
  subscribers: string[];
  posts: Post[];
  _id: string;
  recipeName: string;
  description: string;
  products: string;
  imgUrl: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
