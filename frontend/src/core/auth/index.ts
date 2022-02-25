// 사용자 인증 정보를 저장하고 currentUser를 생성해서 모든 컴포넌트에서 가져다 쓸 수 있게 한다.
import { useEffect } from "react";
import { Token, AuthState } from "@interface";
import { useRecoilState } from "recoil";
import {
  getCurrentUserFromToken,
  checkTokenValid,
  checkRefreshValid,
} from "@utils";
import { authSelector } from "@selectors";
import { getToken, saveToken, destroyToken } from "@store";
import { postQuery } from "@api";
import { refreshUserQuery } from "@usersQuery";

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

  const authenticateUser = ({ token, csrf, refresh }: Token) => {
    saveToken({ token, csrf, refresh });
    setCurrentUser({
      token,
      csrf,
      refresh,
      currentUser: getCurrentUserFromToken(token),
    });
  };

  // console.log(currentUser?.token ? checkTokenValid(currentUser?.token) : false);

  // console.log(
  //   currentUser?.token ? checkRefreshValid(currentUser?.token) : false
  // );
  // console.log(currentUser?.token);

  useEffect(() => {
    if (currentUser?.currentUser) {
      if (
        // token invalid 이고, refresh token 까지 timeout면 리셋
        !(
          currentUser?.token &&
          currentUser.refresh &&
          checkTokenValid(currentUser?.token) &&
          checkRefreshValid(currentUser?.refresh)
        )
      ) {
        unAuthenticateUser();
      } else if (
        !(currentUser?.token && checkTokenValid(currentUser?.token)) &&
        currentUser.refresh &&
        checkRefreshValid(currentUser.refresh)
      ) {
        // refresh token이 유효하면 refresh api 호출
        refreshUserApi();
      }
    }
  }, [currentUser]);

  const refreshUserApi = async () => {
    const response = await postQuery(refreshUserQuery());
    if (
      response.data?.data?.refreshUser &&
      response.data?.data?.refreshUser?.token
    ) {
      authenticateUser(response?.data?.data?.refreshUser);
      // console.log(response.data?.data?.refreshUser);
    }
  };

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
