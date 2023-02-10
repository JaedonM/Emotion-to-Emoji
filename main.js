

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera")

Webcam.attach(camera);

function capture()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';

    });

    
}

console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " +prediction_1;
    speak_data_2 = "The second prediction is " +prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterThis);
}



function predict(){

    img = document.getElementById("capture_image")
    classifier.classify(img, gotResult)

}

function gotResult(error, result){

    if (error) {
        console.error(error)
    } else {
        console.log(result)

        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;

        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        speak()

        if (prediction_1=='happy') {
            document.getElementById("update_emoji").innerHTML = '&#128578'
        }


        if (prediction_1=='sad') {
            document.getElementById("update_emoji").innerHTML = '&#128542'
        }

        if (prediction_1=='angry') {
            document.getElementById("update_emoji").innerHTML = '&#128545'
        }

        if (prediction_2=='happy') {
            document.getElementById("update_emoji2").innerHTML = '&#128578'
        }

        if (prediction_2=='sad') {
            document.getElementById("update_emoji2").innerHTML = '&#128542'
        }

        if (prediction_2=='angry') {
            document.getElementById("update_emoji2").innerHTML = '&#128545'
        }


        













    }

}