import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export const useAudio = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null); // For playback
  const [isPlaying, setIsPlaying] = useState(false); // Track playback state

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const recordingOptions = Audio.RecordingOptionsPresets.HIGH_QUALITY;

  // Start recording
  const startRecording = async () => {
    try {
      if (!hasPermission) {
        console.log("Requesting permission...");
        const { status } = await Audio.requestPermissionsAsync();
        setHasPermission(status === "granted");
        if (status !== "granted") {
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
      setIsRecording(true);
      setIsPaused(false);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Pause recording
  const pauseRecording = async () => {
    if (recording) {
      await recording.pauseAsync();
      setIsPaused(true);
      console.log("Recording paused");
    }
  };

  // Resume recording
  const resumeRecording = async () => {
    if (recording) {
      await recording.startAsync();
      setIsPaused(false);
      console.log("Recording resumed");
    }
  };

  // Stop recording
  const stopRecording = async (): Promise<string | null> => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingUri(uri); // Update state
        setRecording(null);
        setIsRecording(false);
        setIsPaused(false);
        console.log("Recording stopped and saved at", uri);
        return uri; // Return the URI
      } catch (err) {
        console.error("Failed to stop recording", err);
        return null;
      }
    }
    return null;
  };

  // Play recording
  const playRecording = async () => {
    if (!recordingUri) return;
  
    try {
      // Stop any existing sound
      if (sound) {
        await sound.unloadAsync();
      }
  
      // Load and play the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
  
      // Handle playback completion
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
  
      console.log("Playback started");
    } catch (err) {
      console.error("Failed to play recording", err);
    }
  };

  // Pause playback
  const pausePlayback = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      console.log("Playback paused");
    }
  };

  // Stop playback
  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      console.log("Playback stopped");
    }
  };

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return {
    hasPermission,
    isRecording,
    isPaused,
    recordingUri,
    isPlaying,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    playRecording,
    pausePlayback,
    stopPlayback,
  };
};