//Historical Events API (https://api-ninjas.com/api/historicalevents)
const API_URL1 = "https://api.api-ninjas.com/v1/historicalevents";
const API_KEY = "U0vXZr1XIjrq3KdjZN9J1w==UMu9BsDb21Y1OAAd";

// Grab the HTML elements
const generatedYear = document.getElementById("generated-year");
const eventsButton = document.getElementById("fetch-events");
const boxList = document.getElementById("boxList");

//Fetch Events
const fetchEvents = async (year) => {
   try{
      //Loading Message
      boxList.innerHTML = "Loading...";

      //Fetch data from API
      const response = await fetch(`${API_URL1}?year=${year}`, {
         headers: {
           "X-Api-Key": API_KEY,
         },
      });

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch historical events.");
      }

      //Convert response to JSON
      const data = await response.json();

      //Display Data
      displayEvents(data);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
   }
};

const displayEvents = (events) => {
   //clear the section
   boxList.innerHTML = "";

   if (events.length === 0) {
      boxList.innerHTML = "No events found for this year.";
      return;
   }

   //Create Cards
   const list = document.createElement("ul");

   events.forEach ((event) => {
      const card = document.createElement("li");
      card.textContent = `${event.event}`;
      list.appendChild(card);
   });

   boxList.appendChild(list);
};

eventsButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchEvents(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});