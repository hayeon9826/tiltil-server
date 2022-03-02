import jwt_decode, { JwtPayload } from "jwt-decode";
import { User } from "@interface";

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const convertObjectToFormData = ({
  modelName,
  data,
}: {
  modelName: string;
  data: { [key: string]: any };
}): FormData => {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(`${modelName}[${k}]`, v));
  return fd;
};

export const getCurrentUserFromToken = (token: string) => {
  const user = jwt_decode(token);
  return user;
};

export const checkTokenValid = (token: string): boolean => {
  const { exp } = jwt_decode(token) as JwtPayload;
  return !!exp && Date.now() <= exp * 1000;
};

export const checkRefreshValid = (refresh: string): boolean => {
  const { exp } = jwt_decode(refresh) as JwtPayload;
  return !!exp && Date.now() <= exp * 1000;
};
