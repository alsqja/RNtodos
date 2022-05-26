import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../styled/theme";

interface IProps {
  curPage: string;
  setCurpage: Dispatch<SetStateAction<string>>;
}

export const MenuSelector = ({ curPage, setCurpage }: IProps) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.menu,
          color: curPage === "all" ? "white" : "grey",
          fontWeight: curPage === "all" ? "bold" : "normal",
        }}
        onPress={() => setCurpage("all")}
      >
        전체
      </Text>
      <Text
        style={{
          ...styles.menu,
          fontWeight: curPage === "today" ? "bold" : "normal",
          color: curPage === "today" ? "white" : "grey",
        }}
        onPress={() => setCurpage("today")}
      >
        오늘
      </Text>
      <Text
        style={{
          ...styles.menu,
          fontWeight: curPage === "done" ? "bold" : "normal",
          color: curPage === "done" ? "white" : "grey",
        }}
        onPress={() => setCurpage("done")}
      >
        완료
      </Text>
      <Text
        style={{
          ...styles.menu,
          fontWeight: curPage === "expiration" ? "bold" : "normal",
          color: curPage === "expiration" ? "white" : "grey",
        }}
        onPress={() => setCurpage("expiration")}
      >
        만료
      </Text>
      <Text
        style={{
          ...styles.menu,
          color: curPage === "mypage" ? "white" : "grey",
          fontWeight: curPage === "mypage" ? "bold" : "normal",
          borderRightWidth: 0,
        }}
        onPress={() => setCurpage("mypage")}
      >
        내정보
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.bg,
    padding: 10,
  },
  menu: {
    flex: 1,
    textAlign: "center",
    color: theme.grey,
    borderBottomColor: "blue",
    borderRightColor: "#dbdbdb",
    borderRightWidth: 1,
  },
});
