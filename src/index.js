// Your code here
const movieDetails = document.getElementById("showing");

   // First Movie Details
fetch('http://localhost:3000/films/1')
.then(response => response.json())
.then(data => {
  const availableTickets = data.capacity - data.tickets_sold
  const movieHTML = `
  <div id ="title" class="title">${data.title}</div>
  <div id ="runtime" class ="meta">${data.runtime}minutes</div>
  <img src="${data.poster}" alt ="${data.title} poster"/>
  <div class ="content">
    <div class ="description">
      <div id ="film-info">${data.description}</div>
      <span id ="showtime" class ="ui label">${data.showtime}</span>
      <span id ="ticket-num">${availableTickets}</span> remaining tickets
    </div>
    <button id ="buy-ticket" class ="ui orange button">Buy Ticket</button>
  </div> 
    `;
    movieDetails.innerHTML = movieHTML
})

// List of movies in the menu
const filmsList = document.getElementById("films")
fetch('http://localhost:3000/films')
.then(response => response.json())
.then(data => {
  data.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('film', 'item');
    li.textContent = movie.title;
    li.addEventListener('click', () => {
      const availableTickets = movie.capacity - movie.tickets_sold
      const movieHTML = `
      <div id = "title" class = "title">${movie.title}</div>
      <div id = "runtime" class = "meta">${movie.runtime}minutes</div>
      <img src = "${movie.poster}" alt = "${movie.title} poster"/>
      <div class = "content">
      <div class = "description">
      <div id = "film-info">${movie.description}</div>
      <span id = "showtime" class= "ui label">${movie.showtime}</span>
      <span id = "">${availableTickets}</span> remaining tickets
      </div>
      <button id = "buy-ticket" class = "ui orange button">Buy Ticket</button>
      </div>
      `;
      movieDetails.innerHTML = movieHTML;

      // Buying ticket button 
      const buyTicket = document.getElementById("buy-ticket");
buyTicket.addEventListener("click", () => {
  if (availableTickets > 0) {
    const newTickets = availableTickets - 1
    availableTickets.textContent = newTickets
    alert('You have a successfully bought a ticket!')
  } else {
    alert('SOLD OUT!')
  }
})
    });
    filmsList.appendChild(li);
  });
});