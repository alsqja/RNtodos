import Checkbox from "expo-checkbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import styled from "styled-components/native";
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
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  isGotAllTodos: boolean;
  req: () => void;
}

export const TodoBox = ({ todos, setTodos, isGotAllTodos, req }: IProps) => {
  const [values, setValues] = useState<ITodo[]>(todos);
  // const isDead = +values.expiration_date < new Date(todayMaker()).getTime();
  // const [isChecked, setIsChecked] = useState(!!todo.is_done);
  const [editreq, editres] = useEditTodo();
  const [deletereq, deleteres] = useDeleteTodo();

  const handleDone = async (id: any, is_done: any) => {
    try {
      editreq(id, "", "", !is_done);
      // setIsChecked(!isChecked);
      // setTodos(
      //   todos.map((todo) => {
      //     if (todo.id === id) {
      //       return { ...todo, is_done: !is_done };
      //     }
      //     return todo;
      //   })
      // );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (editres.called && editres.data) {
      const copy = [...todos];
      setTodos(
        copy.map((todo) => {
          if (todo.id === editres.data.id) {
            return editres.data;
          }
          return todo;
        })
      );
    }
  }, [editres.data, editres.called]);

  const renderItem = (data: any) => {
    const isDead =
      +data.item.expiration_date < new Date(todayMaker()).getTime();
    const isChecked = !!data.item.is_done;

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
          onValueChange={() => handleDone(data.item.id, data.item.is_done)}
          color={isChecked ? "blue" : ""}
        />
        <Text
          style={{
            ...styles.contents,
            textDecorationLine: isChecked ? "line-through" : "none",
          }}
        >
          {data.item.contents}
        </Text>
        <Text
          style={{
            ...styles.expiration_date,
            textDecorationLine: isChecked ? "line-through" : "none",
          }}
        >
          {todayMaker(data.item.expiration_date)}
        </Text>
      </View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.rowBack}>
      {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          closeRow(rowMap, data.item);
        }}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          deletereq(data.item.id);
          setTodos(todos.filter((todo) => todo.id !== data.item.id));
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <SwipeListView
        data={todos}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        previewRowKey={"0"}
        previewOpenValue={-40}
      />
      {isGotAllTodos ? (
        <GotAll>모든 TODO를 불러왔습니다.</GotAll>
      ) : (
        todos.length !== 0 && (
          <TouchableOpacity
            onPress={() => {
              req();
            }}
          >
            <GotAll>더보기</GotAll>
          </TouchableOpacity>
        )
      )}
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
  backTextWhite: {
    color: "red",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    // height: 50,
  },
  rowBack: {
    alignItems: "center",
    // backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 10,
    justifyContent: "center",
    position: "absolute",
    top: 10,
    width: 60,
    marginRight: "5.5%",
    borderRadius: 15,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "black",
    right: 0,
  },
});

const GotAll = styled.Text`
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  padding: 10px 0;
  color: ${theme.color};
  text-align: center;
  /* border-top: 1px solid black; */
`;
