var x;
var rad = 0;
var mic = document.querySelector("#mic");
var project = document.querySelector("#projects");
var img;

function setup() {
  var c = createCanvas(windowWidth, 500);
  c.parent("something");
  c;  
  textAlign(LEFT, CENTER);
  x = windowWidth/2;
}
function draw() {
  background(30);
  fill(236,235,228);
  textFont("Raleway");
  textSize(80);
  if(mouseX >= (windowWidth/2)-220 && mouseX <= windowWidth/2+180 && mouseY >=250 && mouseY<=330) {
    if(rad<140) {
      rad+=6;
    }
    fill(236,135,128);
  }
  push();
  translate(windowWidth/2-200, 350);
  rotate( -radians(rad) );
  text("W", 0, -50);
  pop();
  push();
  translate(windowWidth/2-120, 350);
  rotate( radians(rad));
  text("e", 0, -50);
  pop();
  push();
  translate(windowWidth/2-75, 350);
  rotate( radians(rad));
  text("l", 0, -50);
  pop();
  push();
  translate(windowWidth/2-50, 350);
  rotate( -radians(rad));
  text("c", 0, -50);
  pop();
  push();
  translate(windowWidth/2-10, 350);
  rotate( radians(rad));
  text("o", 0, -50);
  pop();
  push();
  translate(windowWidth/2+40, 350);
  rotate( -radians(rad));
  text("m", 0, -50);
  pop();
  push();
  translate(windowWidth/2+110, 350);
  rotate( radians(rad));
  text("e", 0, -50);
  pop();
}

project.addEventListener('click', e=> {
  window.open("../Projects/index.html", "_self"); 
})

document.addEventListener('click', e=> {
  rad = 0;
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
    if(result.includes("project")) {
      talk("Oppening projects");
      window.open("../Projects/index.html", "_self");
    }else if(result.includes("who are you")) {
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

