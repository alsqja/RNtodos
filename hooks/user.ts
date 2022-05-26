import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { useAxios } from "./axios";

export const useUserData = (navigation: any) => {
  const [request, response] = useAxios();

  const run = useCallback(async () => {
    const user_id = await AsyncStorage.getItem("userId");
    if (!user_id) {
      navigation.push("Signin");
      return;
    }

    return request({
      url: `/user/${user_id}/data`,
      method: "GET",
    });
  }, [request]);

  return [run, response] as [typeof run, typeof response];
};

export const useUser = (navigation: any) => {
  const [request, response] = useAxios();

  const run = useCallback(async () => {
    const user_id = await AsyncStorage.getItem("userId");
    if (!user_id) {
      navigation.push("Signin");
    }
    return request({
      url: `/user/${user_id}`,
      method: "GET",
    });
  }, [request]);

  return [run, response] as [typeof run, typeof response];
};

export const useEditUser = (navigation: any) => {
  const [request, response] = useAxios();

  const run = useCallback(
    async (name: string, old_password: string, password: string) => {
      const user_id = await AsyncStorage.getItem("userId");
      if (!user_id) {
        navigation.push("Signin");
      }
      return request({
        url: `/user/${user_id}`,
        method: "PUT",
        data: {
          name,
          old_password,
          password,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useDeleteUser = (navigation: any) => {
  const [request, response] = useAxios();

  const run = useCallback(async () => {
    const user_id = await AsyncStorage.getItem("userId");
    if (!user_id) {
      navigation.push("Signin");
    }
    return request({
      url: `/user/${user_id}`,
      method: "DELETE",
    });
  }, [request]);

  return [run, response] as [typeof run, typeof response];
};
