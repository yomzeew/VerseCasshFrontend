import { Image, ImageBackground, View, Text } from "react-native"
import ViewTheme from "../components/ViewTheme"
import { Themetext } from "../components/ThemeText"
import ButtonComponent from "../components/buttonComponent"
import { useTheme } from "../hooks/useTheme"
import { RecordAnimation } from "../components/animation/animationComponent"
import { Audio} from 'expo-av';
import { ReactNode, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
 
interface ComponentProps{
    setcurrentIndex:(value:number)=>void;
    currentindex:number
}
const OnboardingPage = () => {
    const { theme } = useTheme()
    const color = theme === "dark" ? '#000000' : '#ffffff'
    const bgcolor = theme === "dark" ? '#ffffff' : '#000000'
    const [currentIndex ,setcurrentIndex]=useState<number>(0)
    const componentArray:ReactNode[]=[
    <FirstStage
    currentindex={currentIndex}
    setcurrentIndex={setcurrentIndex}
    />,
    <SecondStage
    currentindex={currentIndex}
    setcurrentIndex={setcurrentIndex}
    />,
    <ThirdStage
    currentindex={currentIndex}
    setcurrentIndex={setcurrentIndex}
    />]
    return (
        <>
            <ImageBackground resizeMode="cover" className="w-full h-full pt-[56px]" source={require('../assets/bg.png')}>
              {componentArray[currentIndex]}
            </ImageBackground>
        </>
    )

}
export default OnboardingPage
const Positionpointer = ({ backgroundColor = "" }: { backgroundColor?: string }) => {
    const { theme } = useTheme()
    return (
        <>
            <View style={{ backgroundColor: backgroundColor, borderColor: theme === "dark" ? "#ffffff" : "#000000" }} className="w-2 h-2 rounded-full border border-white">
            </View>
        </>
    )
}
const FirstStage = ({currentindex,setcurrentIndex}:ComponentProps) => {
    const { theme } = useTheme()
    const color = theme === "dark" ? '#000000' : '#ffffff'
    const bgcolor = theme === "dark" ? '#ffffff' : '#000000'
    const handelPress=()=>{
        if(currentindex===0){
            setcurrentIndex(currentindex+1)
        }
        return
        

    }
    return (
        <>
            <View className="w-full items-center mt-20">
                <Image resizeMode="contain" className="w-auto h-12" source={require('../assets/blackversecatch.png')} />
                <View className="mt-3 w-full items-center">
                    <Text className="text-sm italic">
                        Speak. Detect. Discover His Word
                    </Text>
                    <View className="border-b-2 border-white w-32" />
                </View>
                <View className="mt-10">
                    <Text className="font-bold text-xl">
                        Welcome to VerseCatch!
                    </Text>

                </View>

            </View>
            <View style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }} className="w-full h-[43%] rounded-t-2xl border border-slate-300 absolute bottom-0 z-50 px-3 justify-center ">
                <View className="w-full items-center">
                <Themetext fontsize={16} className="text-center">
                        Speak or stream live, and VerseCatch will identify and display the Bible verses in text.
                    </Themetext>

                </View>
                <View className="w-full items-center px-5 mt-5">
                    <ButtonComponent textcolor={color} color={bgcolor} buttonText="Next →" onPress={handelPress} />
                </View>
                <View className="absolute bottom-20 w-full items-center flex-row justify-center gap-x-3">
                    <Positionpointer backgroundColor={theme === "dark" ? "#ffffff" : "#000000"} />
                    <Positionpointer backgroundColor="" />
                    <Positionpointer backgroundColor="" />

                </View>

            </View>
        </>
    )
}
const SecondStage = ({currentindex,setcurrentIndex}:ComponentProps) => {
    const { theme } = useTheme()
    const color = theme === "dark" ? '#000000' : '#ffffff'
    const bgcolor = theme === "dark" ? '#ffffff' : '#000000'
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const handelPress=()=>{
        if(currentindex===1){
            setcurrentIndex(currentindex+1)
        }
        return
        

    }

  useEffect(() => {
    let isMounted = true; // Prevents state updates after unmounting

    async function playSound() {
      console.log("Loading sound...");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/speech(2).mp3") // Replace with your actual file
      );

      if (!isMounted) return; // Prevent playing if unmounted
      setSound(sound);

      console.log("Playing sound...");
      await sound.playAsync();

      // Listen for when playback finishes
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log("Sound finished playing, unloading...");
          await sound.unloadAsync();
          setSound(null);
        }
      });
    }

    playSound();
    return () => {
      isMounted = false;
      if (sound) {
        console.log("Component unmounted, unloading sound...");
        sound.unloadAsync();
      }
    };
  }, []);

    return (
        <>
            <View className="w-full items-center mt-20">
                <Image resizeMode="contain" className="w-auto h-12" source={require('../assets/blackversecatch.png')} />
                <View className="mt-3 w-full items-center">
                    <Text className="text-sm italic">
                        Speak. Detect. Discover His Word
                    </Text>
                    <View className="border-b-2 border-white w-32" />
                </View>
                <View className="mt-10 items-center">
                {sound===null?
                <>
                <View className="w-32 items-center ">
                    <Text className="text-lg text-center italic">
                    And Jesus went up into a mountain, and there he sat with his disciples.
                    </Text>
                    </View>
                    <Text className="font-bold text-xl">
                    📖 Read & Share
                    </Text>
                </>
                

                :
                <>
                <RecordAnimation/>
                <Text className="font-bold text-xl">
                    🎙️ Speak or Record
                    </Text>
                </>
                    }
                    
                  

                </View>

            </View>
            <View style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }} className="w-full h-[43%] rounded-t-2xl border border-slate-300 absolute bottom-0 z-50 px-3 justify-center ">
                <View className="w-full items-center">
                <Themetext fontsize={16} className="text-center"> 🎙️ Speak or Record</Themetext>
                    <Themetext fontsize={12} className="text-center mt-1">
                        say a Bible verse or stream audio, and VerseCatch will listen.
                    </Themetext>
                    <Themetext fontsize={16} className="text-center mt-3">
                        🔍Auto-Detect Verses
                    </Themetext>
                    <Themetext fontsize={12} className="text-center mt-1">
                        VerseCatch finds the verse reference and shows it instantly.
                    </Themetext>
                    <Themetext fontsize={16} className="text-center mt-3"> 
                        📖 Read & Share
                    </Themetext>
                    <Themetext fontsize={12} className="text-center">See the full verse, explore different translations, and share with friends!</Themetext>
                   
                </View>
                <View className="w-full items-center px-5 mt-5">
                    <ButtonComponent textcolor={color} color={bgcolor} buttonText="Got it! →" onPress={handelPress} />
                </View>
                <View className="absolute bottom-20 w-full items-center flex-row justify-center gap-x-3">
                    <Positionpointer backgroundColor="" />
                    <Positionpointer backgroundColor={theme === "dark" ? "#ffffff" : "#000000"} />
                    <Positionpointer backgroundColor="" />

                </View>

            </View>
        </>
    )
}
const ThirdStage = ({currentindex,setcurrentIndex}:ComponentProps) => {
    const { theme } = useTheme()
    const color = theme === "dark" ? '#000000' : '#ffffff'
    const bgcolor = theme === "dark" ? '#ffffff' : '#000000'
    const navigation=useNavigation()
    const handelPress=()=>{
        if(currentindex===2){
            navigation.navigate('main')
            return
        }
        
        return
        

    }
    return (
        <>
            <View className="w-full items-center mt-20">
                <Image resizeMode="contain" className="w-auto h-12" source={require('../assets/blackversecatch.png')} />
                <View className="mt-3 w-full items-center">
                    <Text className="text-sm italic">
                        Speak. Detect. Discover His Word
                    </Text>
                    <View className="border-b-2 border-white w-32" />
                </View>
                <View className="mt-10">
                    <Text className="font-bold text-xl">
                      Ready to Get Started?
                    </Text>

                </View>

            </View>
            <View style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }} className="w-full h-[43%] rounded-t-2xl border border-slate-300 absolute bottom-0 z-50 px-3 justify-center ">
                <View className="w-full items-center">
                    <Themetext fontsize={16} className="text-center">
                    🚀 Tap below to start using VerseCatch.
                    </Themetext>
                    <Themetext fontsize={16} className="text-center mt-3">
                    🎤 Speak now or start a live stream to discover Bible verses effortlessly!
                    </Themetext>
                </View>
                <View className="w-full items-center px-5 mt-5">
                    <ButtonComponent textcolor={color} color={bgcolor} buttonText="Start Using VerseCatch 🎙️" onPress={handelPress} />
                </View>
                <View className="absolute bottom-20 w-full items-center flex-row justify-center gap-x-3">
                    <Positionpointer backgroundColor="" />
                    <Positionpointer backgroundColor="" />
                    <Positionpointer backgroundColor={theme === "dark" ? "#ffffff" : "#000000"} />

                </View>

            </View>
        </>
    )
}

