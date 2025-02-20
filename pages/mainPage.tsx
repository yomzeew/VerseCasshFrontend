import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react"; // Add useEffect
import { View, Text, TouchableOpacity,Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { useAudio } from "../hooks/useAudioHook";
import { uploadAudioFile } from "../fetchdata/uploadFetch";
import getNextVerse from "../fetchdata/getNextVerse";
import { Themetext, ThemetextBold } from "../components/ThemeText";
import ViewTheme from "../components/ViewTheme";
import RoundedComponent from "../components/roundedComponent";
import { RecordAnimation, StartRecordAnimation } from "../components/animation/animationComponent";
import Spacer from "../components/spacer";
import ButtonComponent from "../components/buttonComponent";
import SliderModalTemplate from "../components/slideupContainer";

const MainPage = () => {
  const [data, setData] = useState<string[]>([]);
  const [showloader,setshowloader]=useState<boolean>(false)
  const [placeholder, setPlaceholder] = useState<string>(
    "Listening for a verse... Speak a scripture to see it displayed"
  );
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [verseref, setverseref] = useState<string>('');
  const [verse, setverse] = useState<string>('');
  const [currentindex, setcurrentindex] = useState<number>(0);
  const [expandedVerses, setExpandedVerses] = useState<{ [key: number]: { verse: string, reference: string } }>({});
  const { theme } = useTheme();
  const imageSource=theme==='dark'?require('../assets/whiteversecatch.png'):require('../assets/blackversecatch.png')
  const {
    hasPermission,
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    resumeRecording,
    recordingUri,
    playRecording,
    stopRecording,
  } = useAudio();

  // Reset expandedVerses when data changes
  useEffect(() => {
    if (data.length > 0) {
      const initialExpandedVerses: { [key: number]: { verse: string, reference: string } } = {};
      data.forEach((item: any, index: number) => {
        initialExpandedVerses[index] = { verse: item.verse, reference: item.reference };
      });
      setExpandedVerses(initialExpandedVerses);
    } else {
      setExpandedVerses({});
    }
  }, [data]);

  const handleGetUri = async () => {
    const uri = await stopRecording();
    console.log("Recording URI:", uri);

    if (uri) {
      const controller = new AbortController();  // Create new controller
      setAbortController(controller)
      const uploadAudio = await uploadAudioFile(uri,setshowloader,controller);
      if (uploadAudio.success) {
        console.log("Upload successful");
        const getData = uploadAudio.verses || [];

        if (getData.length === 0) {
          setPlaceholder("I didn't catch that. Try speaking a Bible verse again");
          setData([]);
        } else {
          setData(getData);
        }
        playRecording();
      }
    } else {
      console.log("No recording URI found");
    }
  };

  const handlegetVerse = async (value: string, key: number) => {
    const textref = expandedVerses[key]?.reference || value;
    const getVerse = await getNextVerse(textref);

    if (getVerse.success) {
      const newverse = getVerse.verse || '';
      const nextverse = getVerse.reference || '';

      // Update the expanded verses map
      setExpandedVerses(prev => ({
        ...prev,
        [key]: { verse: newverse, reference: nextverse }
      }));

      setcurrentindex(key);
    }
  };

  const cancelUpload = () => {
    if (abortController) {
      abortController.abort();  // Abort the upload
      setAbortController(null);
    }
  };
  const [showslideup,setshowslideup]=useState(true)

  return (
    <>
{showslideup &&
<SliderModalTemplate setshowmodal={setshowslideup} showmodal={showslideup} modalHeight={"80%"}>
  <Themetext fontsize={18}>
    Sign up/Login
  </Themetext>

  </SliderModalTemplate>
  }

   {showloader &&
    <>
 <View className="opacity-80 bg-slate-900 h-full w-full  absolute z-40"/>
 <View className="h-full w-full absolute z-50 items-center justify-center">
  <StartRecordAnimation/>
  <Image resizeMode="contain" source={ require('../assets/whiteversecatch.png') } className="h-8 w-auto -mt-6"/>
  <TouchableOpacity onPress={cancelUpload} className="bg-black rounded-2xl border-white border py-2 px-3 mt-3">
    <Text className="text-white">Cancel Process</Text>
  </TouchableOpacity>
 </View>
   </>
   }

   
    <ViewTheme className="h-full w-full flex-1 pt-[56px]">
      <StatusBar style="auto" />
      <View className="items-center">
      <Image resizeMode="contain" source={imageSource} className="w-36 h-12" />
      <Spacer height={30} />
      </View>
      <View className="flex-1 px-5 items-center">
        <ScrollView showsVerticalScrollIndicator={false} >
        {data.length > 0 ? (
          data.map((item: any, index: number) => (
            <ViewTheme key={index} className="h-auto justify-center items-center w-full">
              <ThemetextBold fontsize={24} className="font-bold">
                {expandedVerses[index]?.reference || item?.reference}
              </ThemetextBold>
              <Spacer height={30} />
              <Themetext fontsize={18} className="text-center text-wrap">
                {expandedVerses[index]?.verse || item?.verse}
              </Themetext>
              <Spacer height={10} />
              <View className="w-full items-end">
                <TouchableOpacity onPress={() => handlegetVerse(item?.reference, index)} className="gap-x-2 flex-row rounded-2xl w-16 h-8 items-center justify-center" style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#000000" }}>
                  <Text style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
                    Next
                  </Text>
                  <FontAwesome5 name="angle-right" size={24} color={theme === "dark" ? "#000000" : "#ffffff"} />
                </TouchableOpacity>
              </View>
            </ViewTheme>
          ))
        ) : (
          <ViewTheme className="h-1/2 justify-center items-center">
            <ThemetextBold fontsize={24} className="font-bold">
              {placeholder}
            </ThemetextBold>
          </ViewTheme>
        )}
          
        </ScrollView>
       
      </View>

      {/* Bottom Section */}
      <View
        className="rounded-t-2xl h-[40%] items-center w-full"
        style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}
      >
        <View className="border-b-2 h-2 w-10 border-slate-500" />
        <Spacer height={40} />
        <RoundedComponent>
          {isPaused || !isRecording ? <StartRecordAnimation /> : <RecordAnimation />}
        </RoundedComponent>
        <Spacer height={20} />
        <View className="items-center w-64">
          <Themetext className="text-center" fontsize={16}>
            Transcribing and detecting Bible quotations in real-time.
          </Themetext>
        </View>
        <Spacer height={30} />

        {/* Recording Control Buttons */}
        <View className="w-64">
          {isRecording ? (
            isPaused ? (
              <ButtonComponent
                buttonText={
                  <View className="flex-row gap-x-3">
                    <FontAwesome5 name="microphone" size={24} color={theme === "dark" ? "#000000" : "#ffffff"} />
                    <Text style={{ color: theme === "dark" ? "#000000" : "#ffffff", fontSize: 16 }}>
                      Continue Listening
                    </Text>
                  </View>
                }
                color={theme === "dark" ? "#ffffff" : "#000000"}
                textcolor={theme === "dark" ? "#000000" : "#ffffff"}
                onPress={resumeRecording}
                disabled={!hasPermission}
              />
            ) : (
              <ButtonComponent
                buttonText={
                  <View className="flex-row gap-x-3">
                    <FontAwesome5 name="microphone-slash" size={24} color="red" />
                    <Text style={{ color: "red", fontSize: 16 }}>
                      Stop Listening
                    </Text>
                  </View>
                }
                color={"#FBD0D1"}
                textcolor={theme === "dark" ? "#000000" : "#ffffff"}
                onPress={handleGetUri}
                disabled={!hasPermission}
              />
            )
          ) : (
            <ButtonComponent
              buttonText={
                <View className="flex-row gap-x-3">
                  <FontAwesome5 name="microphone" size={24} color={theme === "dark" ? "#000000" : "#ffffff"} />
                  <Text style={{ color: theme === "dark" ? "#000000" : "#ffffff", fontSize: 16 }}>
                    Start Listening
                  </Text>
                </View>
              }
              color={theme === "dark" ? "#ffffff" : "#000000"}
              textcolor={theme === "dark" ? "#000000" : "#ffffff"}
              onPress={startRecording}
              disabled={!hasPermission}
            />
          )}
        </View>
      </View>
    </ViewTheme>

    </>
    
  );
};

export default MainPage;