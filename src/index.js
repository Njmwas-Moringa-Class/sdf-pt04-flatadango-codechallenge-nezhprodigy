// Your code here
const filmsList = document.querySelector("#films");
const movieDetails = document.querySelector("#showing");

fetch("http://localhost:3000/films")
 .then((response) => response.json())
 .then((data) => {
  data.forEach((film) => {
   const filmHTML = `
    <li class="film item">
     <a href="#" data id="${film.id}">${film.title}</a>
     <button class="ui orange button buy-ticket">Buy Ticket</button>
    </li>
   `;
   filmsList.insertAdjacentHTML("beforeend", filmHTML);
  });

    const availableTickets = data[0].capacity - data[0].tickets_sold;
    const movieHTML = `
    <div id="title" class="title">${data[0].title}</div>
    <div id="runtime" class="meta">${data[0].runtime} minutes</div>
    <img src="${data[0].poster}" alt="${data[0].title} poster" />
    <div class="content">
     <div class="description">
      <div id="film-info">${data[0].description}</div>
      <span id="showtime" class="ui label">${data[0].showtime}</span>
      <span id="ticket-num">${availableTickets}</span> remaining tickets
     </div>
     <button id="buy-ticket" class="ui orange button">Buy Ticket</button>
    </div>
    `;
    movieDetails.innerHTML = movieHTML;
  })
  .catch((error) => console.error(error));

filmsList.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const filmId = event.target.dataset.id;

    fetch(`/films`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

     const availableTickets = data.capacity - data.tickets_sold;
     const movieHTML = `
<div id="title" class="title”>${data.title}</div>
<div id="runtime" class="meta”>${data.runtime} minuti</div>
<img src="${data.poster}” alt="${data.title} poster" />
<div class="content">
  <div class="description">
    <div id="film-info">${data.description}</div>
    <span id="showtime" class="ui label”>${data.showtime}</span>
    <span id="ticket-num">${availableTickets}</span> remaining tickets
  </div>
<button id="buy-ticket" class="ui orange button">Buy Ticket</button>
</div>
`;
movieDetails.innerHTML = movieHTML;
 })
.catch((error) => console.error(error));
}
});

filmsList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // Buy ticket button
  }
});
