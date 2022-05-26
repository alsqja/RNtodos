import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, DefaultValue, selector } from "recoil";

interface IUser {
  id: number;
}

const userId = AsyncStorage.getItem("userId");

export const tokenState = atom<IUser | null>({
  default: null,
  key: "user/info",
} as any);
