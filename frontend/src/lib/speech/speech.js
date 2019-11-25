const SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");
const subscriptionKey = "6c1aeea224214bda92334ed54ffa0852"
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