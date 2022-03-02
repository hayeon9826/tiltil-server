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
import { refreshQuery } from "@api";
import { refreshUserQuery } from "@usersQuery";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useRecoilState<AuthState>(
    authSelector as any
  );

  const authenticateUser = ({ token, csrf, refresh }: Token) => {
    saveToken({ token, csrf, refresh });
    setCurrentUser({
      token,
      csrf,
      refresh,
      currentUser: token ? getCurrentUserFromToken(token) : null,
    });
  };

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
    // refreshUserApi();
  }, [currentUser]);

  const refreshUserApi = async () => {
    const response = await refreshQuery(refreshUserQuery());
    if (
      response.data?.data?.refreshUser &&
      response.data?.data?.refreshUser?.token
    ) {
      authenticateUser(response?.data?.data?.refreshUser);
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
