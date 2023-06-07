import { Text,ScrollView, View,Alert} from "react-native";
import { SafeAreaProvider, SafeAreaView } from  "react-native-safe-area-context";
import { s } from "./app.style";
import { Header } from "./components/Header/Header.jsx";
import { CardTodo } from "./components/CardTodo/CardTodo.jsx"
import {useState} from "react";
import { TapBottomMenu } from "./components/TapeBottomMenu/TapBottomMenu.jsx"
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd.jsx"
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
let isFirstRender = true;
let isLoadUpdate = false;
export default function App() { 
    const [ selectedTabName, setSelectedTabName ] = useState("all");
    const [ isAddDialogVisible, setIsAddDialogVisible] = useState(false);
    const [todoList, setTodoList]= useState([]);
    const [inputValue, setInputValue]= useState("");

  useEffect(()=>{
    loadTodoList()
  },[]);

  useEffect(()=>{
    if(isLoadUpdate){
      isLoadUpdate= false;
    }else{
        if (!isFirstRender){
          saveTodoList()
        }else{
          isFirstRender=false;
        }
   } 
  },[todoList]);
  
  async function saveTodoList(){
    try{
      await AsyncStorage.setItem("@todolist",JSON.stringify(todoList));
    }catch(err){
      alert("Errour" + err);
    }
  }

  async function loadTodoList(){
    try{
      const stringifiedTodoList= await AsyncStorage.getItem("@todolist");
      if (stringifiedTodoList !==null ){
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate= true;
        setTodoList(parsedTodoList);
      }
    }catch(err){
      alert("Errour" + err);
    }
  }
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
    const newTodo = {
      id: uuid.v4(),
      title : inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
  }
  function showAddDialog(){
    setIsAddDialogVisible(true);
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
                        <ButtonAdd onPress={showAddDialog} />           
                  </SafeAreaView>  
            </SafeAreaProvider>
       
                  <TapBottomMenu
                      todoList={todoList}
                      onPress= {setSelectedTabName} 
                      selectedTabName = { selectedTabName } 
            />
          <Dialog.Container visible={isAddDialogVisible} onBackdropPress={()=>setIsAddDialogVisible(false)}>
             <Dialog.Title>
                Créer une tâche
             </Dialog.Title>
             <Dialog.Description>
                Choisir un nom pour la nouvelle tâche 
             </Dialog.Description>
             <Dialog.Input onChangeText={(setInputValue)} />
             
             <Dialog.Button 
              disabled={inputValue.trim().length=== 0}
                label="Créer" 
                onPress={addTodo} 
              />

                   
          </Dialog.Container>  
          </>       
      );
}