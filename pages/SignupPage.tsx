import { View,TextInput, TouchableOpacity,Text } from "react-native"
import { Themetext } from "../components/ThemeText"
import { useTheme } from "../hooks/useTheme"
import Spacer from "../components/spacer"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"

const SignUpPage=({setshowauth}:{setshowauth:(value:string)=>void})=>{
    const {theme}=useTheme()
    return(
        <>
        <View>
            <View className="items-center mt-5">
            <Spacer height={10} />
            <View className="w-full px-5">
                <Themetext fontsize={12}>First Name:</Themetext>
                <TextInput className={`${theme==='dark'?'bg-slate-500 text-white':'bg-slate-200 text-black'} px-2 h-12 w-full rounded-xl`} />
            </View>
            <Spacer height={20} />
            <View className="w-full px-5">
                <Themetext fontsize={12}>Last Name:</Themetext>
                <TextInput className={`${theme==='dark'?'bg-slate-500 text-white':'bg-slate-200 text-black'} px-2 h-12 w-full rounded-xl`} />
            </View>
            <Spacer height={20} />
            <View className="w-full px-5">
                <Themetext fontsize={12}>Email:</Themetext>
                <TextInput className={`${theme==='dark'?'bg-slate-500 text-white':'bg-slate-200 text-black'} px-2 h-12 w-full rounded-xl`} />
            </View>
            <Spacer height={20} />
            <View className="w-full px-5">
                <Themetext fontsize={12}>Password:</Themetext>
                <TextInput keyboardType="numeric" className={`${theme==='dark'?'bg-slate-500 text-white':'bg-slate-200 text-black'} px-2 h-12 w-full rounded-xl`} />
            </View>
            <Spacer height={20}/>
            <View className="px-5 w-full">
            <TouchableOpacity style={{backgroundColor:theme==='dark'?'#ffffff':'#000000'}} className="rounded-2xl h-12 w-full items-center justify-center">
                <Text style={{color:theme==='dark'?'#000000':'#ffffff'}} className="text-lg">Login</Text>
            </TouchableOpacity>
            <Spacer height={10}/>
            <View className="flex-row items-center">
                <Themetext fontsize={12}>I have an account </Themetext>
                <TouchableOpacity onPress={()=>setshowauth('signin')}><Themetext fontsize={16}>Sign in</Themetext></TouchableOpacity>
            </View>

            </View>
     
            </View>
            <Spacer height={30}  />
            <View className="items-center w-full">
            <View className="flex-row gap-x-2 items-center">
                <View className="border-b w-32 border-slate-400"/>
                <Themetext fontsize={20}>OR Sign up With</Themetext>
                <View className="border-b w-32 border-slate-400"/>

            </View>
            <View className="w-full justify-center flex-row gap-x-5 items-center">
                <TouchableOpacity><FontAwesome color={theme==='dark'?'#ffffff':'#000000'} size={36} name="google-plus-circle"/></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 name="facebook" size={36} color={theme==='dark'?'#ffffff':'#000000'} /></TouchableOpacity>
            </View>
                
            </View>

            
            
            
        </View>
        </>
    )
}
export default SignUpPage