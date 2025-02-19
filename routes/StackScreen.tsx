import { createStackNavigator } from "@react-navigation/stack"
import OnboardingPage from "../pages/onBoarding"
import MainPage from "../pages/mainPage"

const StackScreen=()=>{
    const Stack=createStackNavigator()
    return(
        <>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="start" >
            <Stack.Screen name="start" component={OnboardingPage} />
            <Stack.Screen name="main" component={MainPage} />
        </Stack.Navigator>
        
        </>
    )
}
export default StackScreen