// Your code here
const movieDetails = document.getElementById("showing");
filmsList = document.getElementById("films");
buyButton = document.getElementById("buy-ticket");
soldOutFilm = document.querySelector('.film.item');
const ticketNum = document.getElementById('ticket-num');

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
    </div>`;

    movieDetails.innerHTML= movieHTML;
  });
  filmsList.appendChild(li);
});
});

// Buying movie tickets
buyButton.addEventListener('click', () => {
  if (ticketNum > 0) {
    const newTicketNum = ticketNum - 1;
    ticketNum.textValue = newTicketNum;
    alert('Congratulations! You have successfully purchased a ticket!');
  } else {
    buyButton.textContent = 'SOLD OUT!';
    soldOutFilm.classList.add('SOLD OUT!');
    alert('Oops looks like this showing is already sold out!');
  }
});
