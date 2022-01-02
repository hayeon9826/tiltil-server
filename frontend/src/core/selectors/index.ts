import { selector, selectorFamily } from "recoil";
import { authState } from "@atoms";
import { AuthState } from "@interface";

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => get(authState),
  set: ({ set }, newAuthState: AuthState) => set(authState, newAuthState),
});
