let imageArray = ["images/image1.jpg", "images/image1.jpg", "images/image2.jpg", "images/image2.jpg", "images/image3.jpg",
    "images/image3.jpg", "images/image4.jpg", "images/image4.jpg", "images/image5.jpg", "images/image5.jpg", "images/image6.jpg",
    "images/image6.jpg", "images/image7.jpg", "images/image7.jpg"];
let imageDiv = document.querySelectorAll(".imageSecrete > p");
let imageBackG = document.querySelectorAll(".imageSecrete");
let firstValue = "";
let secondValue = "";
let countUntilVictory = 0;
let gameIsOn = false;

// Sur bouton start jenvoi les liens des images dans chaque div
function letsStart() {
    let imageArrayCopy = imageArray.slice(0);
    for (let i = 0; i < 14; i++) {
        let number = 0;
        number = Math.floor(Math.random() * imageArrayCopy.length);
        imageDiv[i].innerHTML = imageArrayCopy[number];
        imageArrayCopy.splice(number, 1);
        console.log(imageDiv[i])  
    }
    document.querySelector(".start").innerHTML = "Game is ON";
    document.querySelector(".start").disabled = true;
    gameIsOn = true;
} 

// Quand je clique sur une div
document.querySelector(".container").addEventListener("mousedown", function onMouseDown(event) {
    
    if (gameIsOn) {
        if (firstValue == "" && secondValue == "") {
            // Je prend la valeur du <p> de la div
            firstValue = event.target.textContent; 
            // Et je la passe en valeur du backgroundImage ------- Afin de changer l'image
            event.target.style.backgroundImage = "url('" + firstValue.trim() + "')";
            // Le contour c'est dire que c'est ele que j'ai choisi et que ce sont elle que je traiterai plus tard
            event.target.style.borderColor = "blue";
            console.log("premiere")
        } else if (firstValue != "" && secondValue == "" && event.target.style.borderColor != "blue") {
            secondValue = event.target.textContent;
            event.target.style.backgroundImage = "url('" + secondValue.trim() + "')";
            event.target.style.borderColor = "blue";
            console.log("seconde")
        }
    }
})
//-----------------------------------------------------------------------------

document.querySelector(".container").addEventListener("mouseup", function onMouseUp(event) {

    if (firstValue == secondValue && firstValue != "" && secondValue != "") {
        for (let i = 0; i < 14; i++) {
            if (imageBackG[i].style.borderColor == "blue") {
                imageBackG[i].style.borderColor = "green"
            }
        }
        console.log("cest egal")
        countUntilVictory++;
        firstValue = "";
        secondValue = "";
    }
    else if (firstValue != secondValue && firstValue != "" && secondValue != "") {
        alert("Essaye encore");
        firstValue = "";
        secondValue = "";
        for (let i = 0; i < 14; i++) {
            if (imageBackG[i].style.borderColor != "green") {
                imageBackG[i].style.borderColor = "";
                imageBackG[i].style.backgroundImage = "url('images/bloc_mystere.jpg')";
            }
        }
    }

    if (countUntilVictory == 7) {
        alert("Victory")
        for (let i = 0; i < 14; i++) {
            imageBackG[i].style.backgroundImage = "url('images/bloc_mystere.jpg')";
            imageBackG[i].style.borderColor = "";
            imageDiv[i].innerHTML = ""
        }
        firstValue = "";
        secondValue = "";
        countUntilVictory = 0;
        gameIsOn = false;
        document.querySelector(".start").innerHTML = "Let's Start"
        document.querySelector(".start").disabled = false;
    }
})
  
