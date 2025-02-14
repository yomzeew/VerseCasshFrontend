import { ReactNode } from "react"
import { Text } from "react-native"
import {useTheme}from "../hooks/useTheme"
import { primarycolortextdark, primarycolortextlight } from "../static/color"

interface ThemetextProps{
    children:ReactNode
    className?:string
    fontsize:number
}
export const Themetext=({children,className,fontsize}:ThemetextProps)=>{
    const {theme}=useTheme()
    return(
        <Text style={{color:theme==='light'?primarycolortextlight:primarycolortextdark,fontFamily:'Geist-Regular',fontSize:fontsize}} className={className}>
            {children}
        </Text>
    )
}

export const ThemetextBold=({children,className,fontsize}:ThemetextProps)=>{
    const {theme}=useTheme()
    return(
        <Text style={{color:theme==='light'?primarycolortextlight:primarycolortextdark,fontFamily:'Geist-Bold',fontSize:fontsize}} className={className}>
            {children}
        </Text>
    )
}
