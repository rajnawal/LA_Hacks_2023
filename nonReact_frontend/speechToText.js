const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const audioRecognition = new SpeechRecognition();
audioRecognition.continuous = true;
audioRecognition.lang = "en-US";
audioRecognition.interimResults = true;
audioRecognition.maxAlternatives = 1;

audioRecognition.onstart = function() {
    // console.log("Microphone recording started");
}

audioRecognition.onresult = function(event) {
    var script = event.results[event.resultIndex][0].transcript;
    // console.log(script);
    document.getElementById("transcript").innerHTML = script;
}

audioRecognition.onend = function()
{
    audioRecognition.abort();
    // console.log("Microphone recording ended");
    audioRecognition.start();
}

audioRecognition.start();
