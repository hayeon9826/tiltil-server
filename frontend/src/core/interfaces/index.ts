// 타입스크립트 인터페이스 정의

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

export type { User, Category, Item, SigninAttribute, SignUpAttribute };
