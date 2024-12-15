//Historical Events API (https://api-ninjas.com/api/historicalevents)
export const API_URL1 = "https://api.api-ninjas.com/v1/historicalevents";
export const API_KEY = "U0vXZr1XIjrq3KdjZN9J1w==UMu9BsDb21Y1OAAd";

// Grab the HTML elements
export const generatedYear = document.getElementById("generated-year");
export const eventsButton = document.getElementById("fetch-events");
export const boxList = document.getElementById("boxList");

//Fetch Events
export const fetchEvents = async (year) => {
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

export const displayEvents = (events) => {
   //clear the section
   boxList.innerHTML = "";

   if (events.length === 0) {
      boxList.innerHTML = "No events found for this year.";
      return;
   }

   //Create Cards
   events.forEach ((event) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const title = document.createElement("h3");
      const content = document.createElement("p");
      
      title.textContent = `${event.month} / ${event.day} / ${event.year}`;
      content.textContent = `${event.event}`;

      card.appendChild(title);
      card.appendChild(content);

      boxList.appendChild(card);
   });
};