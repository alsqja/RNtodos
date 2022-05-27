import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";
import { todayMaker } from "../../functions/time";
import { useDeleteTodo, useEditTodo } from "../../hooks/todos";
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
  const [deleteReq, deleteRes] = useDeleteTodo();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDone = async () => {
    try {
      editreq(values.id, "", "", !values.is_done);
      setIsChecked(!isChecked);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    Alert.alert("삭제하기", "삭제하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "확인",
        onPress: async () => {
          if (deleteRes.loading) return;

          try {
            await deleteReq(values.id);
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (deleteRes.called) {
      setIsDeleted(true);
    }
  }, [deleteRes.called]);

  if (isDeleted) return <></>;

  return (
    <TouchableHighlight
      onLongPress={handleDelete}
      style={{
        ...styles.container,
        width: "90%",
        marginLeft: "5%",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: isDead ? "red" : theme.todoBg,
          paddingVertical: 10,
          paddingHorizontal: 10,
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
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    // width: "90%",
    // marginLeft: "5%",
    borderRadius: 15,
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
