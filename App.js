import { Text,ScrollView, View,Alert} from "react-native";
import { SafeAreaProvider, SafeAreaView } from  "react-native-safe-area-context";
import { s } from "./app.style";
import { Header } from "./components/Header/Header.jsx";
import { CardTodo } from "./components/CardTodo/CardTodo.jsx"
import {useState} from "react";
import { TapBottomMenu } from "./components/TapeBottomMenu/TapBottomMenu.jsx"
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd.jsx"
import Dialog from "react-native-dialog";
export default function App() { 
    const [ selectedTabName, setSelectedTabName ] = useState("all");

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

  function getFilteredList(){
    switch (selectedTabName){
        case "all":
          return todoList;
        case "inProgress":
          return todoList.filter((todo)=> !todo.isCompleted);
        case "done":
          return todoList.filter((todo)=> todo.isCompleted);

    }
  }
    
  function updateTodo(todo){
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };

    const indexToUpdate =todoList.findIndex(
        (todo)=> todo.id=== updateTodo.id 
    );

    const updateTodoList = [...todoList]
    updateTodoList[indexToUpdate]= updateTodo;
    setTodoList(updateTodoList);
  }
  function deleteTodo(todoDelete){
    Alert.alert("Suppression", "Supprimer cette tâche ?",[
      {
        text: "Suppression",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter(todo=> todo.id !==todoDelete.id)) 
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      }
    ])
  }
  function renderTodoList(){
      return getFilteredList().map((todo)=>( 
            <View style={s.cardItem} key={todo.id}> 
                  <CardTodo onLongPress={deleteTodo} onPress ={updateTodo} todo={todo} />
            </View>));
    }
  function addTodo(){
    
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
                        <ButtonAdd  />           
                  </SafeAreaView>  
            </SafeAreaProvider>
       
                  <TapBottomMenu
                      todoList={todoList}
                     onPress= {setSelectedTabName} 
                     selectedTabName = { selectedTabName } 
            />
          <Dialog.Container>
                    
          </Dialog.Container>  
          </>       
      );
}