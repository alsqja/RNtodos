import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTodoList } from "../../hooks/todos";
import { CreateTodo } from "../CreateTodo";
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
      {todos.map((todo) => {
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
