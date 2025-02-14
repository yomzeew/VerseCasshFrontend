import { ReactNode } from "react"
import { View } from "react-native"
interface RoundedComponentProps{
    children:ReactNode
}
const RoundedComponent=({children}:RoundedComponentProps)=>{
    return(
        <>
        <View className="w-24 h-24">
        <View style={{elevation:4}} className="shadow-sm shadow-slate-900 absolute  h-full w-full rounded-full bg-slate-600 opacity-90"/>
        <View className="h-24 w-24 rounded-3xl items-center justify-center">
            {children}
        </View>

        </View>
        
        </>
    )
}
export default RoundedComponent