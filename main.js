var SpeechRecognition = window.webkitSpeechRecognition;
var Recognition = new SpeechRecognition();

function Start(){
    document.getElementById("textbox").innerHTML = "";
    Recognition.start();
}

Recognition.onresult = function(event){
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("textbox").innerHTML = Content;
    if (Content == "take my selfie"){
        console.log("Taking Selfie");
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "Taking three selfies with 5 second intervals. Enjoy!";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function()
    {
        img_id = "MySelfie1";
        take_snapshot();
        save();
        speak_data = "Taking your next Selfie in 5 seconds!";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    },5000);
    setTimeout(function (){
        img_id = "MySelfie2";
        take_snapshot();
        save();
        speak_data = "Taking final Selfie in 5 seconds!";
        var utterThis = new SpeechSynthesisUtterance (speak_data);
        synth.speak(utterThis);
    },10000);
    setTimeout(function (){
        img_id = "MySelfie3";
        take_snapshot();
        save();
        speak_data = "All three selfies successfully captured. Hope you enjoy them!";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

    },15000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90,
});
camera = document.getElementById("camera");

function take_snapshot(){
    console.log(img_id);

    Webcam.snap(function(data_uri){
        if(img_id=="MySelfie1") {
            document.getElementById("result1").innerHTML = '<img id="MySelfie1" src="'+data_uri+'" style="margin: 10px; border-radius: 7px;"/>';
        }
        if(img_id=="MySelfie2") {
            document.getElementById("result2").innerHTML = '<img id="MySelfie2" src="'+data_uri+'" style="margin: 10px; border-radius: 7px;"/>';
        }
        if(img_id=="MySelfie3") {
            document.getElementById("result3").innerHTML = '<img id="MySelfie3" src="'+data_uri+'" style="margin: 10px;  border-radius: 7px;"/>';
        }
    });
}

function save(){
    link = document.getElementById("link");
    image= document.getElementById("MySelfie1").src;
    link.href= image;
    link.click();
}


