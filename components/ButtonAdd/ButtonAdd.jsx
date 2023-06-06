import { Text,TouchableOpacity} from "react-native";
import {s} from "./ButtonAdd.style"
export function ButtonAdd(onLongPress) {
  return(
    <TouchableOpacity  style={s.btn}> 
    
      <Text style={s.txt}>+ New todo</Text>
    </TouchableOpacity>
  );
   
  
}