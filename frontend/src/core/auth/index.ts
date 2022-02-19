// 사용자 인증 정보를 저장하고 currentUser를 생성해서 모든 컴포넌트에서 가져다 쓸 수 있게 한다.
import React from "react";
import { Token, AuthState } from "@interface";
import { useRecoilState } from "recoil";
import { TOKEN_KEY, CSRF_KEY } from "@interface";
import { getCurrentUserFromToken } from "@utils";
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

  const [currentUser, setCurrentUser] = useRecoilState<AuthState>(authSelector);

  console.log(currentUser);

  const authenticateUser = ({ token, csrf }: Token) => {
    saveToken({ token, csrf });
    setCurrentUser({
      token,
      csrf,
      currentUser: getCurrentUserFromToken(token),
    });
  };

  const unAuthenticateUser = () => {
    destroyToken();
    setCurrentUser({ token: null, csrf: null, currentUser: null });
  };

  return {
    ...currentUser,
    authenticateUser,
    unAuthenticateUser,
    isAuthenticated: !!currentUser.token && !!currentUser.csrf,
  };
};

export default useAuth;
