var x, y;
let easing = 0.05;
var boxes = [];
var change = 600;
var size = 400;
var isVideo = false;
var model = null;
var selected = 10;

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozkitGetUserMedia ||
  navigator.mskitGetUserMedia;

const back = document.querySelector("#back");
const mic = document.querySelector("#mic");
const hand = document.querySelector("#hand");
const video = document.querySelector("#video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var Projects = ["Color Switch", "FitCook", "Swaddle", "Rummy", "Handy Home\nGlove", "Snappy Bird", "Paalan", "Circle", "Assembly\nCompiler", "3D\nPokeDex"]
var photo_name = ["color_switch.png", "fitcook.jpeg", "Swaddle.png", "rummy.jpg", "glove.jpg", "snappy_bird.jpg", "paalan.jpg", "circle.jpeg", "blank.png", "Pokedex.png"]

var images = [null, null, null, null, null, null, null, null, null, null];

hand.addEventListener('click', e=> {
  if(isVideo == false) {
    talk("Starting Video");
    startVid();
    isVideo = true;
  } else {
    talk("Stopping Video");
    handTrack.stopVideo(video)
    isVideo = false;

    talk("Video stopped");
  }
})
hand.addEventListener('mouseover', e=> {
  hand.style.fontSize = "25px";
  hand.style.borderColor = "rgb(236,135,128)";
})
hand.addEventListener('mouseout', e=> {
  hand.style.fontSize = "20px";
  hand.style.borderColor = "rgb(236,235,228)";
})



back.addEventListener('click', e=> {
  window.open("../Main/index.html", '_self');
})

back.addEventListener('mouseover', e=> {
  back.style.fontSize = "30px";
  back.style.borderColor = "rgb(236,135,128)";
})
back.addEventListener('mouseout', e=> {
  back.style.fontSize = "20px";
  back.style.borderColor = "rgb(236,235,228)";
})

mic.addEventListener("click", e=> {
  recognition.start();
})

mic.addEventListener('mouseover', e=> {
  mic.style.fontSize = "25px";
  mic.style.bottom = "20px";
  mic.style.left = "15px";
  mic.style.borderColor = "rgb(236,135,128)";
})
mic.addEventListener('mouseout', e=> {
  mic.style.fontSize = "20px";
  mic.style.bottom = "25px";
  mic.style.left = "20px";
  mic.style.borderColor = "rgb(236,235,228)";
})



function preload() {
  for(var i=0;i<10;i++) {
    images[i] = loadImage('../Photos/'+photo_name[i]);
  }
  img = loadImage("../Photos/arrow.png");
  img1 = loadImage("../Photos/arrow1.png");
}

function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  x = 400;
  y = windowHeight/2 + 80;
  textSize(width / 3);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (x < -change*10 + windowWidth + 300) {
    x += 5;
  } else if (x > windowHeight/2) {
    x -= 5;
  }
  document.ondblclick = e=> {
    if(mouseY>y-40-(size/2) && mouseY<y+(size/2)-40) {
      for(var i=0;i<10;i++) {
        if(mouseX>x+change*i-+(size/2) && mouseX<x+change*i+(size/2)) {
          window.open("../"+i+"/index.html", "_self");
        }
      }
      
    }
  };

  document.onmousemove = e=> {
    if(mouseY>y-40-(size/2) && mouseY<y+(size/2)-40) {
      var ch=0;
      for(var i=0;i<10;i++) {
        if(mouseX>x+change*i-+(change/2) && mouseX<x+change*i+(change/2)) {
          ch++;
          selected = i;
        }
      }
      if(ch==0) {
        selected = 10;
      }
    }
    else
      selected = 10;
  }

  if(mouseIsPressed) {
    if(x > -change*10 + windowWidth/2 - 100 ) {
      let targetX = mouseX;
      if(targetX >= 4*windowWidth/5) {
        easing = 0.05
      } else if(targetX >= 3*windowWidth/5) {
        easing = 0.01;
      } else if(targetX >= 2*windowWidth/5) {
        easing = 0;
      } else if(targetX >= windowWidth/5) {
        easing = 0.01;
      } else{
        easing = 0.05;
      }
      x -= (targetX - windowWidth/2) * easing;
    }
  }
  background(28,28,28);
  
  for(var i=0;i<10;i++) {
    fill(236,235,228);
    if(i==selected) {
      strokeWeight(10);
      stroke(236,135,128);
      boxes[i] = rect(x+change*i, y-40, change*0.9, size*1.1, 40);
      noStroke();
    }else {
      boxes[i] = rect(x+change*i, y-40, change*0.9, size, 40);
    }
    fill(28,28,28);
    text(Projects[i], x + change*i, y-40);
  }
  fill(236,235,228);
  textSize(64);
  text('Projects', windowWidth/2, 80);
  if (x > -change*10 + windowWidth + 400) {
    image(img,windowWidth*(1-(1/12+1/80)), windowHeight*(1/3), windowWidth/12, windowHeight/2);
    if(mouseX>=5*windowWidth/6) {
      x-=10;
    }
  }
  if (x < windowHeight/2-100) {
    image(img1,windowWidth/80, windowHeight/3, windowWidth/12, windowHeight/2);
    if(mouseX<=windowWidth/6) {
      x+=10;
    }
  }
}

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.onstart = function() {
    console.log("Voice recog Started");
}

recognition.onresult = function(event) {
    console.log(event);
    var index = event.resultIndex;
    var result = event.results[index][0].transcript;
    console.log(result);
    result = result.toLowerCase();
    if(result.includes("back")) {
      talk("Going Back");
      window.open("../Main/index.html", "_self");
    }else if(result.includes("Fit cook")) {
      talk("Scroll on to know");
    }else if(result.includes("about you")) {
      talk("Scroll on to know");
    }else {
      talk("Can you please repeat?");
    }
}

function talk(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = message;

    window.speechSynthesis.speak(speech);
}

const modelParams = {
  flipHorizontal: true,   // flip e.g for video  
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVid() {
  handTrack.startVideo(video).then(status => {
    if(status) {
      navigator.getUserMedia({video:{}}, stream => {
        video.srcObject = stream;
        setInterval(runDetection, 10);
      }, err=> {
        console.log(error);
      })
    }
  });
}

function runDetection() {
  if(isVideo==true) {
    model.detect(video).then(predictions => {
      if(predictions.length > 0) 
        var a=(predictions[0].bbox[0] + predictions[0].bbox[2]) / 2;
      model.renderPredictions(predictions, canvas, context, video);
      if(a > 40) {
        x-=10;
      } else if(a < 20) {
        x+=10;
      }
    })
  }
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});
