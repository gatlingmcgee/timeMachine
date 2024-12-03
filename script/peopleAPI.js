//Historical Figures API (https://api-ninjas.com/api/historicalfigures)
const API_URL2 = "https://api.api-ninjas.com/v1/historicalfigures";

//Grab the HTML elements
const peopleButton = document.getElementById("fetch-people");

//Fetch Events
const fetchFigures = async (year) => {
   try{
      //Loading Message
      boxList.innerHTML = "Loading...";

      // Fetch data from the API for the given year
      const response = await fetch(`${API_URL2}?name=${year}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch historical figures.");
      }

      //Convert response to JSON
      const data = await response.json();

      //Display Data
      displayFigures(data);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
   }
};

const displayFigures = (figures) => {
   //clear the section
   boxList.innerHTML = "";

   if (figures.length === 0) {
      boxList.innerHTML = "No historical figures found for this year.";
      return;
   }

   //Create Cards
   const list = document.createElement("ul");

   figures.forEach ((figure, index) => {
      const card = document.createElement("li");
      card.textContent = `${figure.name} (${figure.birth_year || "Unknown"} - ${figure.death_year || "Unknown"})`;
      list.appendChild(card);
   });

   boxList.appendChild(list);
};

peopleButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchFigures(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});