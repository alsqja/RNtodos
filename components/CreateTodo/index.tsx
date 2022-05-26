import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { todayMaker } from "../../functions/time";
import { usePostTodo } from "../../hooks/todos";
import { theme } from "../../styled/theme";

interface ITodos {
  id: number;
  contents: string;
  expiration_date: string;
  is_done: boolean;
  createdAt: string;
}

interface IProps {
  handleCreate: (newTodo: ITodos) => void;
}

export const CreateTodo = ({ handleCreate }: IProps) => {
  const [date, setDate] = useState(new Date());
  const [contents, setContents] = useState("");
  const [req, res] = usePostTodo();

  const handleSubmit = async () => {
    try {
      await req(
        contents,
        new Date(todayMaker(date.getTime().toString())).getTime().toString()
      );
      handleCreate({
        id: new Date().getTime(),
        contents: contents,
        expiration_date: date.getTime().toString(),
        is_done: false,
        createdAt: new Date().getTime().toString(),
      });
      setDate(new Date());
      setContents("");
    } catch (e) {
      console.log(e);
    }
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, selected) => {
        if (selected) setDate(selected);
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Input TODO"
        style={styles.input}
        value={contents}
        onChangeText={(text) => setContents(text)}
        autoCapitalize="none"
      />
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={date}
          onChange={(e, selected) => {
            if (selected) setDate(selected);
          }}
          style={styles.date}
        />
      ) : (
        <Text style={styles.date} onPress={showMode}>
          {todayMaker(date.getTime().toString())}
        </Text>
      )}
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.submit}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    marginLeft: "5%",
    alignItems: "center",
    marginVertical: 20,
  },
  date: {
    backgroundColor: "white",
    textAlign: "center",
    lineHeight: 20,
    color: "black",
    minWidth: 80,
    paddingVertical: 10,
    marginLeft: 10,
  },
  input: {
    backgroundColor: theme.color,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  submit: {
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: theme.todoBg,
  },
});
