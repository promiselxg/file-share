"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [segments, setSegments] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const canvasRef = useRef(null);

  // Start screen recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    streamRef.current = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorder.onstop = handleSegmentSave;
    mediaRecorder.start();

    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  // Handle user click to capture and split video
  const captureAndSplit = async () => {
    if (!isRecording || !streamRef.current) return;

    // Capture snapshot
    const track = streamRef.current.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();

    // Draw on canvas to convert to image
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);
    const snapshot = canvas.toDataURL("image/png");
    setSnapshots((prev) => [...prev, snapshot]);

    // Stop current recording and save segment
    mediaRecorderRef.current.stop();
  };

  // Handle saving the video segment
  const handleSegmentSave = () => {
    const blob = new Blob(chunksRef.current, { type: "video/webm" });
    chunksRef.current = []; // Reset chunks
    setSegments((prev) => [...prev, URL.createObjectURL(blob)]);
    if (isRecording) {
      mediaRecorderRef.current.start(); // Resume recording
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Screen Recorder</h1>
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <>
            <button onClick={captureAndSplit}>Capture and Split</button>
            <button onClick={stopRecording}>Stop Recording</button>
          </>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <h2>Snapshots</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {snapshots.map((src, index) => (
          <Image
            key={index}
            src={src}
            width={1000}
            height={500}
            alt={`Snapshot ${index + 1}`}
            style={{ width: "200px", height: "auto", border: "1px solid #ccc" }}
          />
        ))}
      </div>

      <h2>Video Segments</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {segments.map((src, index) => (
          <video
            key={index}
            src={src}
            controls
            style={{ width: "200px", height: "auto", border: "1px solid #ccc" }}
          />
        ))}
      </div>
    </div>
  );
}
