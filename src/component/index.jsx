import React, { useEffect, useRef, useState } from "react";

const Recognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recgonitionRef = useRef(null);
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("web speech api is not supported in the browser");
      return;
    }
    recgonitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recgonitionRef.current;
    recognition.interimesults = options.interimResults || true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;
    if ("webkitSpeechGrammarList" in window) {
      const grammar ="#JSGF V1.0; grammar punctuation; public ‹punc> = . | , | ? | ! | ; | :";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult=(event)=>{
        let text="";
        for(let i=0; i<event.results.length; i++){
            text+=event.results[i][0].transcript;
        }
        setTranscript(text);
    }
    recognition.onerror=(event)=>{
        console.log("Speech Recognition Error : "+ event.error)
    }
    recognition.onend=()=>{
        setIsListening(false);
        setTranscript('');
    }
    return ()=>{
        recognition.stop();
    }

    //jdu
  },[]);

  const startListening=()=>{
    if(recgonitionRef.current && !isListening){
        recgonitionRef.current.start();
        setIsListening(true);
    }
  }

  const stopListening=()=>{
    if(recgonitionRef.current && isListening){
        recgonitionRef.current.stop();
        setIsListening(false);
    }
  }


  return {
    isListening,
    transcript,
    startListening,
    stopListening
  }
};

export default Recognition;
