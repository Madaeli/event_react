import { s } from "./Header.style";
import { Text, Image} from "react-native";
import headerLog from "../../assets/logo.png";
export function Header() {
  return(
    <>
      <Image  style ={s.img} source= {headerLog} resizeMode ={ "contain" } />
      <Text style={s.subtitle}> Liste des taches dans une evenement</Text>
    </>
  );
   
  
}