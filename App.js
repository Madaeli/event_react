import { Text,ScrollView, View} from "react-native";
import { SafeAreaProvider, SafeAreaView } from  "react-native-safe-area-context";
import { s } from "./app.style";
import { Header } from "./components/Header/Header.jsx";
import { CardTodo } from "./components/CardTodo/CardTodo.jsx"
import {useState} from "react";

export default function App() { 
   
    const [todoList, setTodoList]= useState([
      {id: 1, title : "Sortir le chien", isCompleted: true },
      {id: 2, title : "Aller chez le garagiste", isCompleted: false },
      {id: 3, title : "Faire les courses", isCompleted: true },
      {id: 4, title : "Appeler le vétérinaire", isCompleted: true },
      {id: 5, title : "Sortir le chien", isCompleted: true },
      {id: 6, title : "Aller chez le garagiste", isCompleted: false },
      {id: 7, title : "Faire les courses", isCompleted: true },
      {id: 8, title : "Appeler le vétérinaire", isCompleted: true },
    ]);
  function updateTodo(tode){
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };
    const indexToUpdate =todoList.findIndex(
        (todo)=> todo.id=== updateTodo.id 
    );

    const updateTodoList = [...todoList]
    todoList[indexToUpdate]= updateTodo;
    setTodoList(updateTodoList);
      console.log(todo);
  }

  function renderTodoList(){
      return todoList.map((todo)=>( 
            <View style={s.cardItem} key={todo.id}> 
                  <CardTodo onPress={updateTodo} todo={todo} />
            </View>));
    }

    return(
          <>
            <SafeAreaProvider>
                  <SafeAreaView style = { s.app }>
                        <View style={s.header}>
                          <Header/> 
                        </View>
                        <View style={s.body}>
                          <ScrollView> 
                            {renderTodoList()} 
                          </ScrollView>
                         
                        </View>                 
                  </SafeAreaView>  
            </SafeAreaProvider>
            <View style={s.footer}>
                              <Text>Footer</Text>
          </View>
          </>       
      );
}