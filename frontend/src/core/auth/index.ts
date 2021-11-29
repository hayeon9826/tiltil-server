// 사용자 인증 정보를 저장하고 currentUser를 생성해서 모든 컴포넌트에서 가져다 쓸 수 있게 한다.
import React from "react";
import { User } from "@interface";
import { authenticatedUser } from "@atoms";
import { useRecoilValue } from "recoil";

const setUserToken = (token: string) => {
  localStorage.setItem("token", token);
  sessionStorage.setItem("token", token);
};

const authToken =
  typeof window !== "undefined" && window.localStorage?.getItem("token");
const isAuthenticated = authToken ? true : false;

export { setUserToken, authToken, isAuthenticated };
