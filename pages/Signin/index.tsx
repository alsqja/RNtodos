import { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import styled from "styled-components/native";
import { useLogin } from "../../hooks/session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../styled/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";

interface IValues {
  email: string;
  password: string;
}

export const Signin = ({ navigation }: any) => {
  const [values, setValues] = useState<IValues>({
    email: "",
    password: "",
  });
  const [request, { called, data, loading }] = useLogin();

  const routesParams = useRoute();
  useFocusEffect(
    useCallback(() => {
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
    }, [routesParams])
  );
  const handleChange = useCallback(
    (text, key) => {
      setValues({ ...values, [key]: text });
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {
    if (!values.email || !values.password) {
      Alert.alert("필수정보를 입력해주세요.");
      return;
    }

    try {
      await request(values.email, values.password);
    } catch (e: any) {
      if (/[ㄱ-힣]/.test(e)) {
        Alert.alert(e);
      } else {
        Alert.alert("회원정보 변경을 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  }, [values]);

  const loginHandler = async () => {
    await AsyncStorage.setItem("userId", JSON.stringify(data.id));
    navigation.push("Home");
  };

  useEffect(() => {
    if (called && data) {
      loginHandler();
    }
  }, [called, data]);

  return (
    <Container>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor={theme.color}
        autoCapitalize="none"
        value={values.email}
        onChangeText={(text) => handleChange(text, "email")}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={(text) => handleChange(text, "password")}
        autoCapitalize="none"
        value={values.password}
        placeholderTextColor={theme.color}
        secureTextEntry
        onSubmitEditing={handleSubmit}
      />
      <BtnContainer>
        <TouchableOpacity
          onPress={() => {
            navigation.push("Signup");
          }}
        >
          <Btn>회원가입</Btn>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Btn>로그인</Btn>
        </TouchableOpacity>
      </BtnContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "50%",
    padding: 5,
    borderColor: theme.color,
    color: theme.color,
    borderWidth: 1,
    margin: 5,
  },
});

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${theme.todoBox};
`;

const BtnContainer = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Btn = styled.Text`
  justify-content: center;
  align-items: center;
  background-color: ${theme.todoBg};
  color: ${theme.color};
  padding: 5px 0;
  width: 80px;
  border-radius: 10px;
  text-align: center;
`;
