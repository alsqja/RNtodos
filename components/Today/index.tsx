import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTodoList } from "../../hooks/todos";
import { CreateTodo } from "../CreateTodo";
import styled from "styled-components/native";
import { TodoBox } from "../TodoBox";
import { theme } from "../../styled/theme";
import { todayMaker } from "../../functions/time";

interface ITodos {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}

export const Today = ({ navigation }: any) => {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [isGotAllTodos, setIsGotAllTodos] = useState(false);
  const [req, res] = useTodoList(navigation);
  const page = useRef(0);

  const requestQuery = useCallback(() => {
    req({
      filter: "today",
      page: page.current,
      expiration_date: new Date(todayMaker()).getTime().toString(),
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
    <TodoContainer>
      <CreateTodo
        handleCreate={(newTodo: ITodos) => {
          setTodos([newTodo, ...todos]);
        }}
      />
      {/* {todos.map((todo) => {
        return <TodoBox key={todo.id} todo={todo} />;
      })}
      {isGotAllTodos ? (
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
      <TodoBox
        todos={todos}
        setTodos={setTodos}
        isGotAllTodos={isGotAllTodos}
        req={requestQuery}
      />
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
