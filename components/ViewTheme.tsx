import { ReactNode } from "react"
import { View } from "react-native"
import {useTheme} from "../hooks/useTheme"
import { primarycolorBgdark, primarycolorBglight } from "../static/color"
interface ViewThemeProps{
    children:ReactNode
    className:string
}
const ViewTheme=({children,className}:ViewThemeProps)=>{
    const {theme}=useTheme()
    return(
        <>
        <View style={{backgroundColor:theme==="light"?primarycolorBglight:primarycolorBgdark}} className={className}>
            {children}
        </View>
        </>
    )
}
export default ViewTheme