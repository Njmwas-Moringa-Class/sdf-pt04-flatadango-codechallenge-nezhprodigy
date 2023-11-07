// Your code here
const movieDetails = document.getElementById("showing");
filmsList = document.getElementById("films");
buyButton = document.getElementById("buy-ticket");
ticketCount = parseInt(document.getElementById('ticket-num').textContent);
soldOutFilm = document.querySelector('.film.item');

// Display first movie details
fetch('http://localhost:3000/films/1')
.then(response => response.json())
.then(data => {
  const remainingTickets = data.capacity - data.tickets_sold
  const movieHTML = `
  <div id="title" class="title">${data.title}</div>
  <div id="runtime" class="meta">${data.runtime} minutes</div>
  <img src="${data.poster}" alt="${data.title} poster"/>
  <div class="content">
   <div class="description">
     <div id="film info">${data.description}</div>
     <span id="showtime" class= "ui label">${data.showtime}</span>
     <span id="ticket-num">${remainingTickets}</span> remaining tickets
   </div>
   <button id ="buy-ticket" class ="ui orange button">Buy Ticket</button>
  </div>
  `;
  movieDetails.innerHTML= movieHTML;
})

// Retrieve details of the movies
 
fetch('http://localhost:3000/films')
.then(response => response.json())
.then(data => {
  data.forEach(movie => {
   const remainingTickets = movie.capacity - movie.tickets_sold
  const li = document.createElement('li');
  li.classList.add('film', 'item');
  li.textContent = movie.title;
  li.addEventListener('click', () => {
   const movieHTML = `
<div id="title" class="title">${movie.title}</div>
<div id="runtime" class="meta">${movie.runtime} minutes</div>
<img src="${movie.poster}" alt="${movie.title} poster"/>
<div class="content">
 <div class="description">
   <div id="film info">${movie.description}</div>
   <span id="showtime" class= "ui label">${movie.showtime}</span>
   <span id="ticket-num">${remainingTickets}</span> remaining tickets
 </div>
 <button id ="buy-ticket" class ="ui orange button">Buy Ticket</button>
</div>
`;
movieDetails.innerHTML= movieHTML;

buyButton.addEventListener("click", () => {
 
 if (ticketCount > 0) {
  const newTicketCount = ticketCount - 1;
  ticketCount.textContent = newTicketCount;
  alert('Congratulations! You have successfully purchased a ticket!');
 } else {
  buyButton.textContent = 'SOLD OUT!';

  soldOutFilm.classList.add('SOLD OUT!');
  alert('Oops looks like this showing is already sold out!');
 }
});
    });
    filmsList.appendChild(li);
  })
})
