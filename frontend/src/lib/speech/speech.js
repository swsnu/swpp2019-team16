const SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");
const subscriptionKey = "9407365045da40268007d2b16486f695"
const serviceRegion = "koreacentral"
let speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
speechConfig.speechRecognitionLanguage = "en-US";
let audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
let recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

export default recognizer;


/*
  recognizer.recognized = (r, event) => {
    let word = 'Stop'
    console.log(event.result.text);
    if(event.result.text.includes(word)){
      recognizer.stopContinuousRecognitionAsync();
    }
  };
  recognizer.startContinuousRecognitionAsync();
  
*/