import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAxios } from "./axios";

export const isUser = async () => {
  const userId = await AsyncStorage.getItem("userId");

  if (!userId) {
    return;
  }

  return JSON.parse(userId);
};

export const useLogout = () => {
  const logout = (navigation: any) => {
    navigation.push("Signin");
    AsyncStorage.setItem("userId", "");
  };

  return logout;
};

export const useLogin = () => {
  const [request, response] = useAxios();

  const run = (email: string, password: string) => {
    return request({
      url: "/auth/signin",
      method: "POST",
      data: { email, password },
    });
  };

  return [run, response] as [typeof run, typeof response];
};

export const useSignup = () => {
  const [request, response] = useAxios();

  const run = (name: string, email: string, password: string) => {
    return request({
      url: "/auth/signup",
      method: "POST",
      data: { name, email, password },
    });
  };

  return [run, response] as [typeof run, typeof response];
};
