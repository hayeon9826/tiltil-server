import { atom } from "recoil";

// user 정보를 atom으로 만들어서 레일즈의 current_user와 동일하게 전체 컴포넌트에서 호출 가능하도록 구현 필요.

export const authenticatedUser = atom({
  key: "currentUser",
  default: {
    email: "",
    id: 0,
  },
});
