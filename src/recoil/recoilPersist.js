import { recoilPersist } from "recoil-persist";


export const { persistAtom} = recoilPersist({
  key: "inventory-app",
  storage: sessionStorage,
});