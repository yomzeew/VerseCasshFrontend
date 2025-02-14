import { TouchableOpacity, View,Text } from "react-native"
import { useTheme } from "../../hooks/useTheme"
import ViewTheme from "../ViewTheme"
import { Themetext } from "../ThemeText"
import Spacer from "../spacer"

const ModalSheet=()=>{
    const {theme}=useTheme()
    return(
        <>
        <View style={{backgroundColor:theme==="dark"?"#ffffff":"#000000"}} className="w-full h-full opacity-75 absolute"/>
        <ViewTheme className="h-1/4 w-11/12 px-3 py-3 justify-center items-center rounded-2xl">
        <View className="w-full items-center">
        <Themetext fontsize={20}>
            Permission to access microphone is required!
            </Themetext>
            <TouchableOpacity className="w-full border-b border-b-slate-300"><Themetext fontsize={20}>Accept</Themetext></TouchableOpacity>
            <Spacer/> 
            <TouchableOpacity className="w-full border-b border-b-slate-300"><Themetext fontsize={20}>Decline</Themetext></TouchableOpacity>

        </View>
            
        </ViewTheme>
        </>
    )
}
export default ModalSheet