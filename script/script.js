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