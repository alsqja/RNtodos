import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { todayMaker } from "../../functions/time";
import { useEditTodo } from "../../hooks/todos";
import { theme } from "../../styled/theme";

interface ITodo {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}

interface IProps {
  todo: ITodo;
}

export const TodoBox = ({ todo }: IProps) => {
  const [values, setValues] = useState<ITodo>(todo);
  const isDead = +values.expiration_date < new Date(todayMaker()).getTime();
  const [isChecked, setIsChecked] = useState(!!todo.is_done);
  const [editreq, editres] = useEditTodo();

  const handleDone = async () => {
    try {
      editreq(values.id, "", "", !values.is_done);
      setIsChecked(!isChecked);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDead ? "red" : theme.todoBg,
      }}
    >
      <Checkbox
        value={isChecked}
        style={styles.checkbox}
        onValueChange={handleDone}
        color={isChecked ? "blue" : ""}
      />
      <Text
        style={{
          ...styles.contents,
          textDecorationLine: isChecked ? "line-through" : "none",
        }}
      >
        {values.contents}
      </Text>
      <Text
        style={{
          ...styles.expiration_date,
          textDecorationLine: isChecked ? "line-through" : "none",
        }}
      >
        {todayMaker(values.expiration_date)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    width: "90%",
    marginLeft: "5%",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  contents: {
    color: theme.color,
    fontSize: 16,
    flex: 1,
  },
  expiration_date: {
    color: theme.color,
    fontSize: 13,
  },
  checkbox: {
    borderColor: theme.todoBox,
    backgroundColor: theme.color,
    marginRight: 10,
  },
});
