import { s } from "./Header.style";
import { Text, Image, View} from "react-native";
import headerLog from "../../assets/logo.png";
export function Header() {
  return(
    <View style ={s.vw}>
      <Image  style ={s.img} source= {headerLog} resizeMode ={ "contain" } />
      <Text style={s.subtitle}> Task list</Text>
    </View>
  );
   
  
}