import { Platform } from "react-native";
import { uploadUrl } from "./endpoint";

import * as FileSystem from "expo-file-system";

export const uploadAudioFile = async (
  fileUri: string, 
  setShowLoader: (value: boolean) => void,
  abortController: AbortController
): Promise<{ success: boolean; verses?: string[]; error?: string }> => {
  try {
    setShowLoader(true);

    // Format URI correctly
    const formattedUri = fileUri.startsWith("file://") ? fileUri : `file://${fileUri}`;
    
    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(formattedUri);
    if (!fileInfo.exists) throw new Error("File does not exist at given path");

    const getFileUrl = Platform.OS === 'android' ? fileUri : fileUri.replace('file://', '');
    console.log(getFileUrl);

    const fileBlob = {
      uri: getFileUrl,
      name: "recording.m4a",
      type: "audio/mp4",
    };

    const formData = new FormData();
    formData.append("audio", fileBlob as any);

    // Upload with AbortController
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
      signal: abortController.signal,  // Attach signal
    });

    if (!response.ok) throw new Error("Failed to upload audio file");

    const data = await response.json();
    console.log(data);

    return { success: true, verses: data.data };
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.warn("Upload aborted!");
      return { success: false, error: "Upload cancelled" };
    }
    console.error("Error uploading audio file:", error);
    return { success: false, error: error.message };
  } finally {
    setShowLoader(false);
  }
};


  