// 타입스크립트 인터페이스 정의
import packageJson from "../../../package.json";
interface User {
  id: number;
  email: string;
  name: string;
  image?: string;
  role?: string;
  title?: string;
  department?: string;
}

interface SigninAttribute {
  email: string;
  password: string;
}

interface SignUpAttribute {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
}

export interface categoryProps {
  id: string;
  title: string;
}

export interface UserLikes {
  [key: string]: Like[];
}

export interface Like {
  id: number;
  targetableType: string;
  targetableId: number;
  userId: number;
}

export interface postProps {
  id: number;
  title: string;
  content: string;
  userId: number;
  categoryIds?: number[];
  categoryTitles?: string[];
  categoryOptions?: any;
  categories?: Category[];
  userName?: string;
  createdAt: string;
}

interface Category {
  name: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

interface Item {
  id: number;
  name: string;
}

/** 리터럴 혹은 불변 객체 */
export const TOKEN_KEY = `${packageJson.name}_TOKEN`;
export const CSRF_KEY = `${packageJson.name}_CSRF`;
export const REFRESH_KEY = `${packageJson.name}_REFRESH`;

export interface Token {
  token: null | string;
  csrf: null | string;
  refresh: null | string;
}

export interface AuthState extends Token {
  currentUser: any; // TODO currentUser 인터페이스화
}

export type { User, Category, Item, SigninAttribute, SignUpAttribute };
