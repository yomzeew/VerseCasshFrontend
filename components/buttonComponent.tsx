import { TouchableOpacity,Text } from "react-native"
import {useTheme} from "../hooks/useTheme"
import { ReactNode } from "react"
interface ButtonComponentProp{
    buttonText:ReactNode
    color:string
    textcolor:string
    onPress:()=>void;
    disabled?:boolean
}
const ButtonComponent=({buttonText,color,textcolor,disabled=false,onPress}:ButtonComponentProp)=>{
    const{theme}=useTheme()
    return(
        <>
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{backgroundColor:color}} className="flex justify-center items-center h-12 w-full rounded-2xl">
            <Text style={{color:textcolor}}>
                {buttonText}
            </Text>
        </TouchableOpacity>
        </>
    )

}
export default ButtonComponent