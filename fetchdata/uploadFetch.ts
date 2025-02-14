import { Platform } from "react-native";
import { uploadUrl } from "./endpoint";

import * as FileSystem from "expo-file-system";

export const uploadAudioFile = async (fileUri: any): Promise<{ success: boolean; verses?: string[]; error?: string }> => {
  try {
    // Ensure the URI is correctly formatted
    
    const formattedUri = fileUri.startsWith("file://") ? fileUri : `file://${fileUri}`;
    

    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(formattedUri);
    if (!fileInfo.exists) {
      throw new Error("File does not exist at given path");
    }
    const getFileurl=Platform.OS === 'android' ? fileUri : fileUri.replace('file://', '')
    console.log(getFileurl)
    const fileBlob = {
        uri: getFileurl,
        name: "recording.m4a", // Ensure correct extension
        type: "audio/mp4", // Adjust for m4a files
      };
  
      const formData = new FormData();
      formData.append("audio", fileBlob as any); 
  

    // Upload the file
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload audio file");
    }

    const data = await response.json();
    console.log(data)
    return { success: true, verses: data.data};
  } catch (error) {
    console.error("Error uploading audio file:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }finally{
    
  }
};

  