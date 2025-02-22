import { useState } from "react"
import LoginPage from "./loginPage"
import SignUpPage from "./SignupPage"
import { TouchableOpacity, View,Text } from "react-native"
import { useTheme } from "../hooks/useTheme"


const AuthPAges=()=>{
    const {theme}=useTheme()
    const [showauth,setshowauth]=useState<string>('signin')
    const handleclick=(value:string)=>{
        setshowauth(value)
    }
    return(
        <>
        <View className="w-full h-full">i
            <View className="flex-row gap-x-2 justify-center w-full">
            <TouchableOpacity onPress={()=>handleclick('signin')} className={`rounded-b-2xl w-32 h-10 items-center justify-center border ${showauth==='signin' && 'border-white'}`}>
                <Text className="text-lg" style={{color:theme==='dark'?'#ffffff':'#000000'}}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleclick('signup')} style={{backgroundColor:theme==='dark'?"#000000":"#000000"}} className={`rounded-b-2xl w-32 h-10 items-center justify-center border ${showauth==='signup' && 'border-white'}`}>
                <Text className="text-lg" style={{color:theme==='dark'?'#ffffff':'#ffffff'}}>Sign Up</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity></TouchableOpacity>
        {showauth==='signin'?<LoginPage setshowauth={(text:string)=>setshowauth(text)}/>:<SignUpPage setshowauth={(text:string)=>setshowauth(text)}/>}
        </View>
        
        </>

    )

}
export default AuthPAges