const API_URL1 = "https://api.api-ninjas.com/v1/historicalevents";
const API_KEY = "U0vXZr1XIjrq3KdjZN9J1w==UMu9BsDb21Y1OAAd";
const API_URL4 = "https://echlarson.github.io/jsonStorage/popCulture.json";
const API_URL3 = "https://echlarson.github.io/jsonStorage/musicChart.json";

// Grab the HTML elements
const generatedYear = document.getElementById("generated-year");
const eventsButton = document.getElementById("fetch-events");
const boxList = document.getElementById("boxList");
const cultureButton = document.getElementById("fetch-culture");
const musicButton = document.getElementById("fetch-music");

//Fetch Events
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
   
         const date = document.createElement("h3");
         const event = document.createElement("h3");
         const description = document.createElement("p");
         const type = document.createElement("p");
         const relatedIndustries = document.createElement("p");
         const socialMentions = document.createElement("p");
         const funFact = document.createElement("p");
         const hashtagsContainer = document.createElement("div");

         date.textContent = `${pop.date}`;
         event.textContent = `${pop.event}`; 
         description.textContent = `${pop.description}`;
         type.textContent = `Event Type: ${pop.type}`
         relatedIndustries.textContent = `Related Industries: ${pop.related_industries}`
         socialMentions.textContent = `Social Mentions: ${pop.social_mentions}`
         funFact.textContent = `Fun Fact: ${pop.fun_fact}`
    
         // Handle hashtags array
         if (Array.isArray(pop.hashtags) && pop.hashtags.length > 0) {
            pop.hashtags.forEach((hashtag) => {
               const hashtagElement = document.createElement("li");
               hashtagElement.textContent = `${hashtag.trim()}`;
               hashtagElement.style.marginRight = "5px"; // Optional: add space between hashtags
               hashtagsContainer.appendChild(hashtagElement);
         });
  
         } else {
            hashtagsContainer.textContent = "No hashtags available";
         }

         card.appendChild(date);
         card.appendChild(event);
         card.appendChild(description);
         card.appendChild(type);
         card.appendChild(relatedIndustries);
         card.appendChild(socialMentions);
         card.appendChild(funFact);
         card.appendChild(hashtagsContainer);

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

eventsButton.addEventListener("click", () => {
   const year = generatedYear.textContent || generatedYear.value;
   if (year) {
      fetchEvents(year);
   } else {
      boxList.innerHTML = "Spin again.";
   }
});

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

      const rank = document.createElement("h3");
      const track = document.createElement("p");
      const artist = document.createElement("p");
      const genre = document.createElement("p");
      const album = document.createElement("p");
      const releaseDate = document.createElement("p");

      rank.textContent = `Ranked #${song.rank}`;
      track.textContent = `${song.title}`; 
      artist.textContent = `by ${song.artist}`;
      genre.textContent = `Genre: ${song.genre}`;
      album.textContent = `Album: ${song.album}`;
      releaseDate.textContent = `Release Date: ${song.releaseDate}`;

      card.appendChild(rank);
      card.appendChild(track);
      card.appendChild(artist);
      card.appendChild(genre);
      card.appendChild(album);
      card.appendChild(releaseDate);

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