import { Text, TouchableOpacity, View} from "react-native";
import {s} from "./TapBottomMenu.syle";
export function TapBottomMenu( {selectedTabName, onPress} ) {
  function getTextStyle(tabName){
    return{
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2F76E5" : "black",
    }
  }

  return(
    <View style={s.container}>
      <TouchableOpacity onPress={()=> onPress("all") }>
        <Text style= {getTextStyle("all")} >All</Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={()=> onPress("all") }>
        <Text style= {getTextStyle("inProgress")}>In progress</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onPress("all") }>
        <Text style= {getTextStyle("done")}>Done</Text>
      </TouchableOpacity>
    </View>
  );
   
  
}