status = "";
user_input = "";
objects = [];

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    user_input = document.getElementById("input_box").value;
}

function modelLoaded(){
    console.log("model loaded");
    document.getElementById("status").innerHTML = "Status: detecting objects";
    status = true;
}

function draw(){
    image(video, 0, 0, 500, 400)
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: objects detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(user_input == objects[i].label){
                video.stop();
                document.getElementById("object_found").innerHTML = user_input + " found";
                synth = window.speechSynthesis; 
                utterThis = new SpeechSynthesisUtterance(user_input + "Found"); 
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = user_input + " not found"
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}