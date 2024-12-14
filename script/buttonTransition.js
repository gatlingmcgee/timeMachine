// Import necessary functions from other files
import { generateUniqueYear } from './time.js'; 
import { updateYear } from './time.js'; 
import { yearDisplay } from './time.js'; 

// Preload the active image
window.onload = function () {
   const openDoor = new Image();
   openDoor.src = "../img/parallaxRunning.webp";
};

// Select elements
const startButton = document.getElementById("control-button");
const timeMachine = document.getElementById("tm");

let isFirstClick = true;  // Track if the first click has happened

// First click: Show the gif and disable the button
startButton.addEventListener("click", function firstClick() {
    if (!isFirstClick) return; // If it's not the first click, do nothing

    // Change to the startup gif
    timeMachine.src = "../img/tmAnSingle.gif";

    // Change to the active image after the gif duration
    setTimeout(() => {
        timeMachine.src = openDoor;
    }, 3000); // Adjust this duration to match your gif's length

    // Update the button and text
    startButton.textContent = "Travel";
    isFirstClick = false; // Mark that the first click has happened

    // Remove the first click listener so it won't fire again
    startButton.removeEventListener("click", firstClick);

    // Reattach the event listener for the second action
    startButton.addEventListener("click", function secondClick() {
        const randomYear = generateUniqueYear();
        updateYear(randomYear); // Update the animated year display
        yearDisplay.textContent = randomYear; // Update the header span
        boxList.innerHTML = "";
    });
});