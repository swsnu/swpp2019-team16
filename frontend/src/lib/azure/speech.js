import dotenv from 'dotenv';
dotenv.config();

const SpeechSDK = require('microsoft-cognitiveservices-speech-sdk');
let speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
  process.env.REACT_APP_STT_KEY,
  process.env.REACT_APP_STT_REGION,
);
speechConfig.speechRecognitionLanguage = 'en-US';
let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
let recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

export default recognizer;
