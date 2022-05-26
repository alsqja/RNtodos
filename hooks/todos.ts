import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { useAxios } from "./axios";

export const useTodoList = (navigation: any) => {
  const [request, response] = useAxios();

  const run = useCallback(
    async (params: any) => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        navigation.push("Signin");
        return;
      }
      return request({
        url: `/todo/user/${userId}`,
        method: "GET",
        params: {
          ...params,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

export const usePostTodo = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    async (contents: string, expiration_date: string) => {
      const user_id = await AsyncStorage.getItem("userId");
      return request({
        url: `/todo/user/${user_id}`,
        method: "POST",
        data: {
          contents,
          expiration_date,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useEditTodo = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    async (
      id: number,
      contents: string,
      expiration_date: string,
      is_done: boolean
    ) => {
      const user_id = await AsyncStorage.getItem("userId");

      return request({
        url: `/todo/${id}/user/${user_id}`,
        method: "PUT",
        data: {
          contents,
          expiration_date,
          is_done,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};
