import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Header } from "../../components/Header";
import { useLogout } from "../../hooks/session";
import { useDeleteUser, useEditUser, useUser } from "../../hooks/user";
import { theme } from "../../styled/theme";

interface IUser {
  id: number;
  name: string;
  email: string;
  old_password: string;
  password: string;
}

export const Edit = ({ navigation }: any) => {
  const [values, setValues] = useState<IUser>({
    id: -1,
    name: "",
    email: "",
    old_password: "",
    password: "",
  });
  const [getUserReq, getUserRes] = useUser(navigation);
  const [editUserReq, editUserRes] = useEditUser(navigation);
  const [deleteUserReq, deleteUserRes] = useDeleteUser(navigation);
  const logout = useLogout();

  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const handleSubmit = async () => {
    if (editUserRes.loading) return;

    try {
      await editUserReq(values.name, values.old_password, values.password);
    } catch (e: any) {
      if (/[ㄱ-힣]/.test(e)) {
        Alert.alert(e);
      } else {
        Alert.alert("회원정보 변경을 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleDelete = () => {
    Alert.alert("회원탈퇴", "정말 탈퇴하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "탈퇴",
        onPress: async () => {
          if (deleteUserRes.loading) return;

          try {
            await deleteUserReq();
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    getUserReq();
  }, [getUserReq]);

  useEffect(() => {
    if (getUserRes.data && getUserRes.called) {
      setValues(getUserRes.data);
    }
  }, [getUserRes.called, getUserRes.data]);

  useEffect(() => {
    if (editUserRes.data && editUserRes.called) {
      Alert.alert("회원정보 변경이 완료되었습니다.");
      navigation.pop();
    }
  }, [editUserRes.called, editUserRes.data]);

  useEffect(() => {
    if (deleteUserRes.called) {
      Alert.alert("탈퇴되었습니다.");
      logout(navigation);
    }
  }, [deleteUserRes]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>닉네임</Text>

          <TextInput
            value={values.name}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(text) => handleChange(text, "name")}
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>아이디</Text>
          <Text style={{ ...styles.input, borderBottomWidth: 0 }}>
            {values.email}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>예전 비밀번호</Text>

          <TextInput
            style={styles.input}
            placeholder="예전 비밀번호"
            placeholderTextColor={"grey"}
            autoCapitalize="none"
            onChangeText={(text) => handleChange(text, "old_password")}
            secureTextEntry
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>변경 비밀번호</Text>

          <TextInput
            style={styles.input}
            placeholder="변경 비밀번호"
            placeholderTextColor={"grey"}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => handleChange(text, "password")}
            // onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{ ...styles.btn, color: "red", fontWeight: "900" }}>
              회원탈퇴
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.btn}>변경</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.btn}>취소</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.todoBox,
    flexDirection: "column",
    // alignItems: "center",
    flex: 1,
    width: "100%",
  },
  valueContainer: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: "5%",
    marginVertical: 20,
    backgroundColor: theme.todoBg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    color: theme.color,
    marginRight: 20,
  },
  input: {
    flex: 1,
    color: theme.color,
    borderBottomColor: theme.color,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  btnBox: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btn: {
    borderRadius: 15,
    backgroundColor: theme.todoBg,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
