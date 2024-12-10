// Pass in needed HTML
function getTimeSegmentElements(segmentElement) {
   //console.log(segmentElement); 
   const segmentDisplay = segmentElement.querySelector(".segment-display");
   const segmentDisplayTop = segmentDisplay.querySelector(".segment-display_top");
   const segmentDisplayBottom = segmentDisplay.querySelector(".segment-display_bottom");
   const segmentOverlay = segmentElement.querySelector(".segment-overlay");
   const segmentOverlayTop = segmentOverlay.querySelector(".segment-overlay_top");
   const segmentOverlayBottom = segmentOverlay.querySelector(".segment-overlay_bottom");

   return {
      segmentDisplay, segmentDisplayTop, segmentDisplayBottom, segmentOverlay, segmentOverlayTop, segmentOverlayBottom
   };
}

// Update text values in segments
function updateSegmentValues(displayElement, overlayElement, value) {
   displayElement.textContent = value;
   overlayElement.textContent = value;
}

// Update and animate a segment
function updateTimeSegment(segmentElement, timeValue) {
   const segmentElements = getTimeSegmentElements(segmentElement);

   if (parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue) {
      return;
   }

   segmentElements.segmentOverlay.classList.add('flip');

   // Change text values
   updateSegmentValues(
      segmentElements.segmentDisplayTop,
      segmentElements.segmentOverlayBottom,
      timeValue
   );

   function finishAnimation() {
      segmentElements.segmentOverlay.classList.remove('flip');
      updateSegmentValues(
         segmentElements.segmentDisplayBottom,
         segmentElements.segmentOverlayTop,
         timeValue
      );

      this.removeEventListener('animationend', finishAnimation);
   }

   segmentElements.segmentOverlay.addEventListener('animationend', finishAnimation);
}

// Update a section with a number
function updateTimeSection(sectionID, timeValue) {
   const sectionElement = document.getElementById(sectionID);
   const timeSegment = sectionElement.querySelector('.time-segment');

   if (timeSegment) {
      updateTimeSegment(timeSegment, timeValue);
   } else {
      console.error(`No time-segment found for section: ${sectionID}`);
   }
}

// Generate a random year
function getRandomYear() {
   const minYear = 1987; // Adjust to your range
   const maxYear = 2000;
   return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
}

// Update all year segments
function updateYear(year) {
   const digits = year.toString().split('');
   const sections = ['thousands', 'hundreds', 'tens', 'ones'];

   digits.forEach((digit, index) => {
      updateTimeSection(sections[index], parseInt(digit, 10));
   });
}

// Select the span to display the year
const yearDisplay = document.getElementById('generated-year');

// Get the list of generated years from localStorage, if any
let generatedYears = JSON.parse(localStorage.getItem('generatedYears')) || [];

// Function to generate a new unique year
function generateUniqueYear() {
   let randomYear = getRandomYear();

   // Check if the year has already been generated in this session
   while (generatedYears.includes(randomYear)) {
      randomYear = getRandomYear(); // Generate a new year if already used
   }

   // Store the year in the list and in localStorage
   generatedYears.push(randomYear);
   localStorage.setItem('generatedYears', JSON.stringify(generatedYears));

   return randomYear;
}

// Event listener for the button
document.getElementById('travel').addEventListener('click', () => {
   const randomYear = generateUniqueYear();
   updateYear(randomYear); // Update the animated year display
   yearDisplay.textContent = randomYear; // Update the header span
   boxList.innerHTML = "";
});