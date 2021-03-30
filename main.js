status = "";
user_input = "";

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(500, 400);
    video.hide()
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
    user_input = document.getElementById("input_box").value;
}

function modelLoaded(){
    console.log("model loaded");
}

function draw(){
    image(video, 0, 0, 500, 400)
}