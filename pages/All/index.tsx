import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { theme } from "../../styled/theme";
import { Header } from "../../components/Header";
import { MenuSelector } from "../../components/MenuSelector";
import { Total } from "../../components/Total";
import { Today } from "../../components/Today";
import { Done } from "../../components/Done";
import { Expiration } from "../../components/Expiration";
import { MyPage } from "../../components/MyPage";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert, BackHandler } from "react-native";

interface ITodos {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}

export const All = ({ navigation }: any) => {
  const [curPage, setCurpage] = useState("all");

  // const routesParams = useRoute();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
          },
          { text: "확인", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <Container>
      <Header navigation={navigation} />
      <MenuSelector curPage={curPage} setCurpage={setCurpage} />
      {curPage === "all" ? (
        <Total navigation={navigation} />
      ) : curPage === "today" ? (
        <Today navigation={navigation} />
      ) : curPage === "done" ? (
        <Done navigation={navigation} />
      ) : curPage === "expiration" ? (
        <Expiration navigation={navigation} />
      ) : (
        <MyPage navigation={navigation} />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  /* align-items: center; */
  background-color: ${theme.todoBox};
`;
