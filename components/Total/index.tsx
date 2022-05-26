import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTodoList } from "../../hooks/todos";
import { CreateTodo } from "../CreateTodo";
import styled from "styled-components/native";
import { TodoBox } from "../TodoBox";
import { theme } from "../../styled/theme";
import { SwipeListView } from "react-native-swipe-list-view";

interface ITodos {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}

export const Total = ({ navigation }: any) => {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [isGotAllTodos, setIsGotAllTodos] = useState(false);
  const [req, res] = useTodoList(navigation);
  const page = useRef(0);

  const requestQuery = useCallback(() => {
    req({
      filter: "all",
      page: page.current,
    });
  }, [req]);

  useEffect(() => {
    requestQuery();
  }, []);

  useEffect(() => {
    if (!res.loading && res.error) {
      console.log(res.error);
      return;
    }
    if (res.data && res.called) {
      if (res.data.length === 0) {
        setIsGotAllTodos(true);
        return;
      }
      if (todos.filter((todo) => todo.id === res.data[0].id).length > 0) {
        return;
      }
      setTodos([...todos, ...res.data]);
      page.current += 1;
      if (res.data.length < 15) {
        setIsGotAllTodos(true);
      }
    }
  }, [res.data, res.called, res.error, res.loading, todos]);

  return (
    <TodoContainer>
      <CreateTodo
        handleCreate={(newTodo: ITodos) => {
          setTodos([newTodo, ...todos]);
        }}
      />
      {/* {todos.map((todo) => {
        return <TodoBox key={todo.id} todo={todo} />;
      })} */}
      <TodoBox
        todos={todos}
        setTodos={setTodos}
        isGotAllTodos={isGotAllTodos}
        req={requestQuery}
      />
      {/* {isGotAllTodos ? (
        <GotAll>모든 TODO를 불러왔습니다.</GotAll>
      ) : (
        todos.length !== 0 && (
          <TouchableOpacity
            onPress={() => {
              requestQuery();
            }}
          >
            <GotAll>더보기</GotAll>
          </TouchableOpacity>
        )
      )} */}
    </TodoContainer>
  );
};

const TodoContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const GotAll = styled.Text`
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  padding: 30px 0;
  color: ${theme.color};
  text-align: center;
  /* border-top: 1px solid black; */
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
