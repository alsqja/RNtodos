import { useCallback, useEffect, useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { useSignup } from "../../hooks/session";
import { theme } from "../../styled/theme";

interface IValues {
  name: string;
  email: string;
  password: string;
}

export const Signup = ({ navigation }: any) => {
  const [values, setValues] = useState<IValues>({
    name: "",
    email: "",
    password: "",
  });
  const [register, { called, data, loading }] = useSignup();

  const handleChange = useCallback(
    (text, key) => {
      setValues({ ...values, [key]: text });
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {
    if (!values.name || !values.email || !values.password) {
      // alert("필수 정보를 입력해주세요.");
      return;
    }
    if (loading) return;

    try {
      await register(values.name, values.email, values.password);
    } catch (e: any) {
      if (/[ㄱ-힣]/.test(e)) {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }, [loading, register, values.email, values.name, values.password]);

  useEffect(() => {
    if (called && data) {
      Alert.alert("회원가입이 완료되었습니다.");
      navigation.push("Signin");
    }
  }, [called, data]);

  return (
    <Container>
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        placeholderTextColor={theme.color}
        value={values.name}
        autoCapitalize="none"
        onChangeText={(text) => {
          handleChange(text, "name");
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor={theme.color}
        autoCapitalize="none"
        value={values.email}
        onChangeText={(text) => {
          handleChange(text, "email");
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor={theme.color}
        autoCapitalize="none"
        secureTextEntry
        value={values.password}
        onChangeText={(text) => {
          handleChange(text, "password");
        }}
      />
      <BtnContainer>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Btn>뒤로</Btn>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Btn>회원가입</Btn>
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
