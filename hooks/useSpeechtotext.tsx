// import { useState, useEffect } from "react";
// import Voice from "@react-native-voice/voice";

// export const useSpeechToText = () => {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   const startListening = async () => {
//     try {
//       setIsListening(true);
//       await Voice.start("en-US");
//     } catch (error) {
//       console.error("Speech Recognition Error:", error);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch (error) {
//       console.error("Error stopping voice:", error);
//     }
//   };

//   const onSpeechResults = (event: any) => {
//     setText(event.value[0]); // Set recognized text
//   };

//   // Attach event listeners when hook is used
//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResults;
//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   return {
//     text,
//     isListening,
//     startListening,
//     stopListening,
//   };
// };
