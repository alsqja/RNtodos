import React, { useCallback, useEffect, useRef, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useTodoList } from "../../hooks/todos";
import styled from "styled-components/native";
import { TodoBox } from "../TodoBox";
import { theme } from "../../styled/theme";

interface ITodos {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}
const wait = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const Expiration = ({ navigation }: any) => {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [isGotAllTodos, setIsGotAllTodos] = useState(false);
  const [req, res] = useTodoList(navigation);
  const page = useRef(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const requestQuery = useCallback(() => {
    req({
      filter: "expiration",
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
      if (res.data.todos.length === 0) {
        setIsGotAllTodos(true);
        return;
      }
      if (todos.filter((todo) => todo.id === res.data.todos[0].id).length > 0) {
        return;
      }
      setTodos([...todos, ...res.data.todos]);
      page.current += 1;
      if (res.data.todos.length < 10) {
        setIsGotAllTodos(true);
      }
    }
  }, [res.data, res.called, res.error, res.loading, todos]);

  // if (todos.length === 0 && res.called && !res.loading) {
  //   return <></>;
  // }

  return (
    <TodoContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {todos.map((todo) => {
        return <TodoBox key={todo.id} todo={todo} />;
      })}
      {isGotAllTodos ? (
        <GotAll>?????? TODO??? ??????????????????.</GotAll>
      ) : (
        todos.length !== 0 && (
          <TouchableOpacity
            onPress={() => {
              requestQuery();
            }}
          >
            <GotAll>?????????</GotAll>
          </TouchableOpacity>
        )
      )}
    </TodoContainer>
  );
};

const TodoContainer = styled.ScrollView`
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
