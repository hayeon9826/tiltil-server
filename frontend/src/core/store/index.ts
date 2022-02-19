import { TOKEN_KEY, CSRF_KEY, Token, REFRESH_KEY } from "@interface";

export const getToken = (): Token => ({
  csrf: window.localStorage.getItem(CSRF_KEY),
  token: window.localStorage.getItem(TOKEN_KEY),
  refresh: window.localStorage.getItem(REFRESH_KEY),
});

export const saveToken = ({ token, csrf, refresh }: Token) => {
  window.localStorage.setItem(TOKEN_KEY, token || "");
  window.localStorage.setItem(CSRF_KEY, csrf || "");
  window.localStorage.setItem(REFRESH_KEY, refresh || "");
};

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(CSRF_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
};

export default { getToken, saveToken, destroyToken };
