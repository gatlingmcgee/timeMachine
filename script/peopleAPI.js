const API_URL2 = "https://echlarson.github.io/jsonStorage/celebrityChart.json";

//Grab the HTML elements
const peopleButton = document.getElementById("fetch-people");

//Fetch Events
const fetchFigures = async (year) => {
   try{
      //Loading Message
      boxList.innerHTML = "Loading...";

      const response = await fetch(`${API_URL2}`);

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch celebrity figures.");
      }

      //Convert response to JSON
      const data = await response.json();
      const celebrityBirth = data.celebrityByBirthYear[year];

      //Display Data
      displayFigures(celebrityBirth);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
   }
};

const displayFigures = (figures) => {
   //clear the section
   boxList.innerHTML = "";

   if (figures.length === 0) {
      boxList.innerHTML = "No celebrity figures found for this year.";
      return;
   }

   //Create Cards
   figures.forEach ((figure) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const title = document.createElement("h3");
      const content = document.createElement("p");

      title.textContent = `${figure.birth_date}`;
      content.textContent = `${figure.name}`;

      card.appendChild(title);
      card.appendChild(content);

      boxList.appendChild(card);
   });
};

peopleButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchFigures(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});