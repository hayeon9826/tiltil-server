import { SigninAttribute, SignUpAttribute } from "@interface";

import { API } from "./config";

// login, register APIs
export const login = async (params: SigninAttribute) => {
  const res = await API.post("/users/sign_in", { params });
  return res;
};

export const signUp = async (params: SignUpAttribute) => {
  const res = await API.post("/users", { params });
  return res;
};

// Query APIs
export const postQuery = (query: any) => API.post("/graphql", { query });
