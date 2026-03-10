import { atom } from "recoil";
import { persistAtom } from "./recoilPersist";


export const menuState = atom({
  key: "menuState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});