import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLogout } from "../../hooks/session";
import { useUserData } from "../../hooks/user";
import { theme } from "../../styled/theme";

const todo = 12;
const done = 20;
const ex = 40;
const sum = todo + done + ex;

interface IOption {
  name: string;
  count: number;
}

export const MyPage = ({ navigation }: any) => {
  const [req, res] = useUserData(navigation);
  const [options, setOptions] = useState<IOption[]>([]);
  const [sum, setSum] = useState(0);
  const logout = useLogout();

  useEffect(() => {
    req();
  }, [req]);

  useEffect(() => {
    if (res.data && res.called) {
      const op = [];
      let sum = 0;
      for (let key in res.data) {
        op.push({
          name: key,
          count: res.data[key],
        });
        sum += res.data[key];
      }
      if (sum === 0) {
        sum = 1;
      }
      setSum(sum);
      setOptions(op);
    }
  }, [res.called, res.data]);

  return (
    <View style={styles.container}>
      {options.map((option) => {
        return (
          <Text
            key={option.name}
            style={{
              ...styles.text,
              color:
                option.name === "fail"
                  ? "red"
                  : option.name.includes("ompl")
                  ? "skyblue"
                  : "white",
            }}
          >{`${option.name.toUpperCase()} : ${option.count} 개 (${(
            (option.count / sum) *
            100
          ).toFixed(1)}%)`}</Text>
        );
      })}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => logout(navigation)}>
          <Text style={styles.btn}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("Edit")}>
          <Text style={styles.btn}>정보수정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    width: "100%",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 50,
  },
  btn: {
    width: 60,
    paddingVertical: 10,
    color: "white",
    marginRight: 20,
    backgroundColor: theme.todoBg,
    textAlign: "center",
    marginTop: 20,
    borderRadius: 15,
  },
});
