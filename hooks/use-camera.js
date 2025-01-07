import { useState, useEffect, useRef, useCallback } from "react";

const useCamera = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState({ cameras: [] });
  const [selectedCamera, setSelectedCamera] = useState(null);

  // Fetch available devices (camera)
  const getDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const cameras = deviceList.filter(
        (device) => device.kind === "videoinput"
      );

      setDevices({
        cameras,
      });

      // Set the default camera if available
      if (cameras.length > 0) {
        setSelectedCamera(cameras[0].deviceId); // Set default to first camera
      }
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError(
        "Unable to fetch device list. Please check your device settings."
      );
    }
  };

  // Turn on the camera
  const turnOnCamera = useCallback(async () => {
    if (!selectedCamera) {
      setError("No camera selected.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCamera },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for the video element to load the new stream before playing
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((err) => {
            console.error("Error playing the video:", err);
            setError("Unable to play the video. Please try again.");
          });
        };
      }
      setError(null);
    } catch (err) {
      console.error("Error accessing the camera:", err);
      setError(
        "Unable to access the camera. Please check your device settings."
      );
    }
  }, [selectedCamera, setError, videoRef]);

  // Turn off the camera
  const turnOffCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      videoRef.current.srcObject = null;
    }
  }, [videoRef]);

  // Fetch devices when the component mounts
  useEffect(() => {
    getDevices();
  }, []);

  return {
    videoRef,
    turnOnCamera,
    turnOffCamera,
    devices,
    selectedCamera,
    setSelectedCamera,
    error,
  };
};

export default useCamera;
