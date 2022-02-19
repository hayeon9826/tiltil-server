// 사용자 인증 정보를 저장하고 currentUser를 생성해서 모든 컴포넌트에서 가져다 쓸 수 있게 한다.
import React from "react";
import { Token, AuthState } from "@interface";
import { useRecoilState } from "recoil";
import {
  getCurrentUserFromToken,
  checkTokenValid,
  checkRefreshValid,
} from "@utils";
import { authSelector } from "@selectors";
import { getToken, saveToken, destroyToken } from "@store";

const useAuth = () => {
  // const setUserToken = (token: string, csrf: string) => {
  //   localStorage.setItem(TOKEN_KEY, token);
  //   localStorage.setItem(CSRF_KEY, csrf);
  // };

  // const authToken =
  //   typeof window !== "undefined" && window.localStorage?.getItem(TOKEN_KEY);
  // const isAuthenticated = authToken ? true : false;

  const [currentUser, setCurrentUser] = useRecoilState<AuthState>(
    authSelector as any
  );
  console.log(currentUser);

  const authenticateUser = ({ token, csrf, refresh }: Token) => {
    saveToken({ token, csrf, refresh });
    setCurrentUser({
      token,
      csrf,
      refresh,
      currentUser: getCurrentUserFromToken(token),
    });
  };

  // console.log(
  //   currentUser?.token ? checkTokenValid(currentUser?.token) : false
  // );

  console.log(
    currentUser?.token ? checkRefreshValid(currentUser?.token) : false
  );
  // console.log(currentUser?.token);

  const unAuthenticateUser = () => {
    destroyToken();
    setCurrentUser({
      token: null,
      csrf: null,
      refresh: null,
      currentUser: null,
    });
  };

  return {
    ...currentUser,
    authenticateUser,
    unAuthenticateUser,
    isAuthenticated:
      (currentUser?.token ? checkTokenValid(currentUser?.token) : false) &&
      !!currentUser.csrf,
  };
};

export default useAuth;
