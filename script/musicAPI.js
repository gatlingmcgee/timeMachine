//Music Charts API (https://rapidapi.com/LDVIN/api/billboard-api/playground/apiendpoint_23285c2d-abe8-4332-a163-18fc5d8d2700)
const API_URL3 = "https://billboard-api2.p.rapidapi.com/year-end-chart/hot-100-songs";
const API_KEY2 = "bf17dc2426msh7666d61e557977bp174193jsn32dea23bc4c1";

//Grab the HTML elements
const musicButton = document.getElementById("fetch-music");

//Fetch Music
const fetchMusic = async (year) => {
   try {
      //Loading Message
      boxList.innerHTML = "Loading...";

      //Fetch data from API
      const response = await fetch(`${API_URL3}?year=${year}`, {
         headers: {
            "X-Api-Key": API_KEY2,
          },
      });
      
      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch Top Hot 100 for that year.");
      }

      //Convert response to JSON
      const data = await response.json();

      //Display Data
      displaySongs(data);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
   }
};

const displaySongs = (songs) => {
   //clear the section
   boxList.innerHTML = "";

   if (songs.length === 0) {
      boxList.innerHTML = "No songs found for this year.";
      return;
   }

   //Create Cards
   const list = document.createElement("ul");

   events.forEach ((song) => {
      const card = document.createElement("li");
      card.textContent = `${song.title} by ${song.artist} (${song.year})`;
      list.appendChild(card);
   });

   boxList.appendChild(list);
};

musicButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchMusic(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});
