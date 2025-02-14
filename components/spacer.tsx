import { View } from "react-native"
interface SpacerProps{
    height?: number
}
const Spacer=({height=10}:SpacerProps)=>{
    return(
        <>
        <View style={{height:height}} />
        </>
    )
}
export default Spacer