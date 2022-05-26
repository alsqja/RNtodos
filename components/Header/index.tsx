import { useRoute } from "@react-navigation/native";
import { Alert, BackHandler, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../styled/theme";

export const Header = ({ navigation }: any) => {
  const routesParams = useRoute();

  const handleBack = () => {
    if (routesParams.name === "Signin" || routesParams.name === "Home") {
      // Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
      //   {
      //     text: "취소",
      //     onPress: () => null,
      //   },
      //   { text: "확인", onPress: () => BackHandler.exitApp() },
      // ]);
      return;
    } else {
      navigation.pop();
    }
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleBack}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            opacity:
              routesParams.name === "Signin" || routesParams.name === "Home"
                ? 0
                : 1,
          }}
        >
          {"<"}
        </Text>
      </TouchableOpacity>
      <Logo>TODOLIST</Logo>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  /* height: 40px; */
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  background-color: ${theme.bg};
`;

const Logo = styled.Text`
  justify-content: center;
  color: ${theme.color};
  align-items: center;
  padding: 0 15px;
  font-size: 20px;
  height: 100%;
`;
