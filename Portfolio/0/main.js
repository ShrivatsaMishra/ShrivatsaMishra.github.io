var img = document.querySelector("#logo");

img.onmouseover = function() {
    img.classList.add('rotate');
}

img.onmouseout = function() {
    img.classList.remove('rotate');
}

back.addEventListener('click', e=> {
    window.open("../Projects/index.html", '_self');
})

back.addEventListener('mouseover', e=> {
    back.style.fontSize = "50px";
})
back.addEventListener('mouseout', e=> {
    back.style.fontSize = "20px";
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
    if(result.includes("back")) {
      talk("Going Back");
      window.open("../Projects/index.html", "_self");
    }else{
      talk("I did not get that.");
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
