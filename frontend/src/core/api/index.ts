import { SigninAttribute, SignUpAttribute } from "@interface";
import { Token } from "@interface";
import { getToken } from "@store";
import { API, PlainAPI } from "./config";

// login, register APIs
export const login = async (params: SigninAttribute) => {
  const res = await PlainAPI.post("/users/sign_in", { params });
  return res;
};

export const signUp = async (params: SignUpAttribute) => {
  const res = await PlainAPI.post("/users", { params });
  return res;
};

export const refresh = (): Promise<{ data: Token }> =>
  PlainAPI.post(
    "/token",
    {},
    {
      headers: {
        "X-CSRF-TOKEN": getToken().csrf || "",
        Authorization: `Bearer ${getToken().token}`,
      },
    }
  );

// Query APIs
export const postQuery = (query: any) => API.post("/graphql", { query });
