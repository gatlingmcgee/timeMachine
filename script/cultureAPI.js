const API_URL4 = "https://echlarson.github.io/jsonStorage/popCulture.json";

// Grab the HTML elements
const cultureButton = document.getElementById("fetch-culture");

//Fetch Music
const fetchCulture = async (year) => {
   try {
      //Loading Message
      boxList.innerHTML = "Loading...";

      const response = await fetch(`${API_URL4}`);

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch Pop Culture.");
      }

      //Convert response to JSON
      const data = await response.json();
      const popCulture = data.popCultureByYear[year];

      //Display Data
      displayCulture(popCulture);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
      }
   };

   const displayCulture = (popEvent) => {
      //clear the section
      boxList.innerHTML = "";
      
      if (popEvent.length === 0) {
         boxList.innerHTML = "No events found for this year.";
         return;
      }
   
      //Create Cards
      popEvent.forEach ((pop) => {
         const card = document.createElement("div");
         card.setAttribute("class", "card");
   
         const title = document.createElement("h3");
         const track = document.createElement("p");
         const content = document.createElement("p");
   
         title.textContent = `${pop.date}`;
         track.textContent = `${pop.event}`; 
         content.textContent = `${pop.details}`;
   
         card.appendChild(title);
         card.appendChild(track);
         card.appendChild(content);
   
         boxList.appendChild(card);
      });
   };

   cultureButton.addEventListener("click", () => {
      const year = generatedYear.textContent || generatedYear.value;
      if (year) {
         fetchCulture(year);
      } else {
         boxList.innerHTML = "Spin again.";
      }
   });