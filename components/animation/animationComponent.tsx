import LottieView from "lottie-react-native"
import { View } from "react-native"

export const StartRecordAnimation=()=>{
    return(
        <>
        <View>
            <LottieView
            source={require('./startAnimation.json')}
            autoPlay
            loop
            style={{width:100, height:100}}
            
            />

        </View>
        </>
    )
}
export const RecordAnimation=()=>{
    return(
        <>
        <View>
            <LottieView
            source={require('./recordAnimation.json')}
            autoPlay
            loop
            style={{width:100, height:100}}
            
            />

        </View>
        </>
    )
}