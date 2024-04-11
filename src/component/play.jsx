import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [userInput, setUserInput] = useState("");
  const audioRef = useRef(null);
  useEffect(()=>{
    setAudioUrl(""); 
  },[userInput]);

  const fetchAudio = async () => {
    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/x3VpW8wv7JS6uqDe2280/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "30db19d4fc2dfc7942bce8f1ed0e2fda",
          },
          body: JSON.stringify({
            model_id: "eleven_multilingual_v2",
            text: userInput,
          }),
        }
      );
      setUserInput("");
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      // Play audio automatically
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  const handleOnChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="The text you want to play"
        value={userInput}
        onChange={handleOnChange}
      />
      <button onClick={fetchAudio}>Fetch Audio</button>
      <audio controls autoPlay className="audiobox" ref={audioRef}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
