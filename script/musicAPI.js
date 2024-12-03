const API_URL3 = "https://echlarson.github.io/jsonStorage/musicChart.json";

// Grab the HTML elements
const musicButton = document.getElementById("fetch-music");

//Fetch Music
const fetchMusic = async (year) => {
   try {
      //Loading Message
      boxList.innerHTML = "Loading...";

      const response = await fetch(`${API_URL3}`);

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch songs.");
      }

      //Convert response to JSON
      const data = await response.json();
      const topSongs = data.topSongsByYear[year];

      //Display Data
      displayMusic(topSongs);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
      }
   };

const displayMusic = (songs) => {
   //clear the section
   boxList.innerHTML = "";
   
   if (songs.length === 0) {
      boxList.innerHTML = "No songs found for this year.";
      return;
   }

   //Create Cards
   const list = document.createElement("ul");

   songs.forEach ((song) => {
      const card = document.createElement("li");
      card.textContent = `${song.rank}. ${song.title} by ${song.artist}`;
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