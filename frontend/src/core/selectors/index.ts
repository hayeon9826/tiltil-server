import { selector, selectorFamily } from "recoil";
import { authState, userLikes } from "@atoms";
import { AuthState } from "@interface";

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => get(authState),
  set: ({ set }, newAuthState) => set(authState, newAuthState),
});

export const getLikeIds = selectorFamily({
  key: "likeIds",
  get:
    (model_name: string) =>
    ({ get }) => {
      const likes = get(userLikes);
      return likes[model_name] || [];
    },
});
