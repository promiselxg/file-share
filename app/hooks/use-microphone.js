import { useState, useEffect } from "react";

const useMicrophone = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(false); // Track if microphone is on or off
  const [deviceMic, setdeviceMic] = useState({ microphones: [] });
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);

  // Function to enable the microphone
  const enableMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setHasPermission(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setHasPermission(false);
    }
  };

  // Function to disable the microphone
  const disableMicrophone = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
      setHasPermission(null);
    }
  };

  // Toggle function for mic on/off
  const toggleMicrophone = () => {
    if (isMicOn) {
      // If mic is currently on, stop it
      disableMicrophone();
    } else {
      // If mic is currently off, start it
      enableMicrophone();
    }
    setIsMicOn(!isMicOn);
  };

  useEffect(() => {
    // Cleanup on component unmount if microphone is active
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioStream]);

  // Fetch devices (cameras in this case, you can adjust if needed)
  const getDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const microphones = deviceList.filter(
        (device) => device.kind === "audioinput"
      );
      setdeviceMic({ microphones });

      if (microphones.length > 0) {
        setSelectedMicrophone(microphones[0].deviceId);
      }
    } catch (err) {
      console.error("Error fetching devices:", err);
    }
  };

  useEffect(() => {
    getDevices(); // Fetch devices on initial load
  }, []);

  return {
    hasPermission,
    audioStream,
    deviceMic,
    toggleMicrophone,
    isMicOn,
    setSelectedMicrophone,
    selectedMicrophone,
  };
};

export default useMicrophone;
