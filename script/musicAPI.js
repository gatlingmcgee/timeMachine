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
   songs.forEach ((song) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const title = document.createElement("h3");
      const track = document.createElement("p");
      const content = document.createElement("p");

      title.textContent = `Ranked #${song.rank}`;
      track.textContent = `${song.title}`; 
      content.textContent = `by ${song.artist}`;

      card.appendChild(title);
      card.appendChild(track);
      card.appendChild(content);

      boxList.appendChild(card);
   });
};

musicButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchMusic(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});