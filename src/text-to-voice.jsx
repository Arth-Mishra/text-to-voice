import React, { useState } from 'react';

const TextToSpeech = () => {
  const [textToSpeak, setTextToSpeak] = useState('');
  
  const handleInputChange = (event) => {
    setTextToSpeak(event.target.value);
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = textToSpeak;
      speechSynthesis.speak(utterance);
    } else {
      console.error('SpeechSynthesis API is not supported in this browser.');
    }
  };

  return (
    <div>
      <h2>Text to Speech Converter</h2>
      <textarea
        placeholder="Enter text to speak"
        value={textToSpeak}
        onChange={handleInputChange}
      />
      <button onClick={speakText}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
