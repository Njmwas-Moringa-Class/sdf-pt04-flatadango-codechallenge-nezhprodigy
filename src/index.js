// Your code here
const movieDetails = document.getElementById("showing");

// Retrieve details of the movie
fetch('http://localhost:3000/films/1')
 .then(response => response.json())
 .then(data => {
  const remainingTickets = data.capacity - data.tickets_sold;
  const movieHTML = `
   <div id="title" class="title">${data.title}</div>
   <div id="runtime" class="meta">${data.runtime} minutes</div>
   <img src="${data.poster}" alt="${data.title} poster"/>
   <div class="content">
    <div class="description">
     <div id="film info">${data.description}</div>
     <span id="showtime" class="ui label">${data.showtime}</span>
     <span id="ticket-num">${remainingTickets}</span> remaining tickets
    </div>
    <button id ="buy-ticket" class ="ui orange button">Buy Ticket</button>
   </div> 
  `;
  // Display the movie details on the webpage
   movieDetails.innerHTML = movieHTML;
 });

 const filmsList = document.getElementById("films");
fetch('http://localhost:3000/films')
.then(response => response.json())
.then(data => {
  data.forEach(movie => {
  const li = document.createElement('li');
  li.classList.add('film', 'item');
  li.textContent = movie.title;
  li.addEventListener('click', () => {
   const remainingTickets = movie.capacity - movie.tickets_sold;
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

const buyButton = document.getElementById("buy-ticket");
buyButton.addEventListener("click", () => {
 const ticketCount = parseInt(document.getElementById('ticket-num').textContent);

 if (ticketCount > 0) {
  const newTicketCount = ticketCount - 1;
  ticketCount.textContent = newTicketCount;
  alert('Congratulations! You have successfully purchased a ticket!');
 } else {
  buyButton.textContent = 'SOLD OUT!';

  const soldOutFilm = document.querySelector('.film.item');
  soldOutFilm.classList.add('SOLD OUT!');
  alert('Oops looks like this showing is already sold out!');
 }
});
    });
    filmsList.appendChild(li);
  })
})
