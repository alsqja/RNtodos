import * as React from "react";
import { View, Text, Button, BackHandler } from "react-native";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { All } from "./pages/All";
import styled from "styled-components/native";
import { theme } from "./styled/theme";
import { StatusBar } from "expo-status-bar";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { RecoilRoot } from "recoil";
import { Edit } from "./pages/Edit";

const Stack = createNativeStackNavigator();

function App() {
  // const [time, setTime] = React.useState(Date());
  // React.useEffect(() => {
  //   setInterval(() => {
  //     setTime(Date());
  //   }, 1000);
  // }, []);

  return (
    <NavigationContainer>
      <RecoilRoot>
        <Container>
          {/* <Text style={{ color: "white", marginLeft: 40, marginTop: 10 }}>
            {time}
          </Text> */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={All} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Edit" component={Edit} />
          </Stack.Navigator>
          <StatusBar style="light" />
        </Container>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.bg};
  padding: 20px 0;
`;

export default App;
