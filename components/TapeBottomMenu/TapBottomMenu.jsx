import { Text, TouchableOpacity, View} from "react-native";
import {s} from "./TapBottomMenu.syle";
export function TapBottomMenu( {selectedTabName, onPress, todoList} ) {
  const contByStatus =  todoList.reduce(
    (acc, todo )=> {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    {all: todoList.length, inProgress: 0, done: 0}
  );
  function getTextStyle(tabName){
    return{
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2F76E5" : "black",
    }
  }

  return(
    <View style={s.container}>
      <TouchableOpacity onPress={()=> onPress("all") }>
        <Text style= {getTextStyle("all")} >All ({contByStatus.all}) </Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={()=> onPress("inProgress") }>
        <Text style= {getTextStyle("inProgress")}>In progress ({contByStatus.inProgress})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onPress("done") }>
        <Text style= {getTextStyle("done")}>Done ({contByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
   
  
}