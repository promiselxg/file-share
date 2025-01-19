"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [clicks, setClicks] = useState([]); // Store click data: { x, y, time }
  const [videoURL, setVideoURL] = useState(null); // Recording video URL
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Start screen recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    streamRef.current = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoURL(URL.createObjectURL(blob));
      chunksRef.current = []; // Clear chunks
    };
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  // Handle user click on the canvas
  const handleCanvasClick = (event) => {
    if (!isRecording || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((event.clientY - rect.top) / rect.height) * canvas.height;

    const currentTime = videoRef.current?.currentTime || 0;

    setClicks((prev) => [...prev, { x: clickX, y: clickY, time: currentTime }]);
  };

  // Draw video frame and overlay clicks on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    const { videoWidth, videoHeight } = video;

    if (videoWidth > 0 && videoHeight > 0) {
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      const drawFrame = () => {
        if (!video.paused && !video.ended) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw video frame

          // Overlay clicks
          const currentTime = video.currentTime;
          clicks.forEach((click) => {
            if (Math.abs(currentTime - click.time) < 0.5) {
              // Highlight click for 0.5s
              ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
              ctx.beginPath();
              ctx.arc(click.x, click.y, 10, 0, Math.PI * 2);
              ctx.fill();
              ctx.font = "16px Arial";
              ctx.fillStyle = "white";
              ctx.fillText("Clicked here!", click.x + 12, click.y - 12);
            }
          });

          requestAnimationFrame(drawFrame); // Continue rendering
        }
      };

      drawFrame();
    }
  };

  // Sync video playback with canvas rendering
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("play", drawCanvas);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", drawCanvas);
      }
    };
  }, [clicks]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Screen Recorder with Canvas</h1>
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      <div style={{ marginTop: "20px", position: "relative" }}>
        {videoURL && (
          <video
            ref={videoRef}
            src={videoURL}
            controls
            style={{ display: "none" }} // Hide video element
            onLoadedMetadata={drawCanvas} // Sync canvas on metadata load
          />
        )}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            border: "1px solid #ccc",
            cursor: "crosshair",
          }}
        />
      </div>
    </div>
  );
}
