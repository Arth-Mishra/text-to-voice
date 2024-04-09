import React, { useState } from "react";
import UseSpeechToText from "../Hooks/UseSpeechToText";

const Speach = () => {
  const [textInput, setTextInput] = useState("");
  const { isListening, transcript, startListening, stopListening } =
    UseSpeechToText({ continuous: true });
  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };
  const stopVoiceInput = () =>{
    setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length? ' ' : "") + transcript : ""));
    stopListening();
  }

  return (
    <div>
      <button onClick={()=>startStopListening()}>{isListening?"Stop Listentin":"Speak"}</button>
      <textarea
        id=""
        cols="30"
        rows="20"
        disabled={isListening}
        value={isListening? textInput+(transcript.length?(textInput.length?" ":'')+transcript:""):textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default Speach;
