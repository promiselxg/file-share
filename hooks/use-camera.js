import { useRef, useState } from "react";

const useCamera = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null); // Track the current stream

  const turnOnCamera = async () => {
    try {
      // Stop previous stream tracks if they exist
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Request access to the camera
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(newStream);

      // Assign the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;

        // Wait for the stream to be loaded before calling play()
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((err) => {
            console.error("Error playing the video:", err);
            setError(
              "Unable to play the video. Please check your device settings."
            );
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
  };

  const turnOffCamera = () => {
    if (stream) {
      // Stop all tracks
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null; // Clear the video source
    }
  };

  return { videoRef, turnOnCamera, turnOffCamera, error };
};

export default useCamera;
