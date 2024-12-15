import { fetchCulture, cultureButton } from './cultureAPI.js';
import { fetchEvents, eventsButton } from './eventsAPI.js';
import { fetchMusic, musicButton } from './musicAPI.js';


// Get all the buttons you want to add hover effect to
const buttons = document.querySelectorAll('button');

// Function to change button style on mouseover
function handleMouseOver(event) {
   event.target.style.backgroundColor = '#ff6600';
   event.target.style.color = '#fff';
   event.target.style.transform = 'scale(1.1)';
}

// Function to reset button style on mouseout
function handleMouseOut(event) {
   event.target.style.backgroundColor = '';
   event.target.style.color = '';
   event.target.style.transform = 'scale(1)';
}

// Attach the event listeners to each button
buttons.forEach(button => {
   button.addEventListener('mouseover', handleMouseOver);
   button.addEventListener('mouseout', handleMouseOut);
});

// Event listeners for API buttons
cultureButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchCulture(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});

eventsButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchEvents(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});

musicButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchMusic(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});