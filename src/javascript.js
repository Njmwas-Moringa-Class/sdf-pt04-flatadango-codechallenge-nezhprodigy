document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = document.querySelector('.card');
    const filmsList = document.querySelector('#films');
    const buyTicketButton = document.querySelector('#buy-ticket');
    const availableTickets = document.querySelector('#available-tickets');
  
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(movie => {
        const remainingTickets = movie.capacity - movie.tickets_sold;
        availableTickets.textContent = remainingTickets;
  
        movieDetails.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title} poster" />
          <h2>${movie.title}</h2>
          <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
          <p><strong>Showtime:</strong> ${movie.showtime}</p>
          <p><strong>Available Tickets:</strong> ${remainingTickets}</p>
        `;
      });
  
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => {
        films.forEach(film => {
          const li = document.createElement('li');
          li.classList.add('film', 'item');
          li.innerHTML = `
            <img src="${film.poster}" alt="${film.title} poster" />
            <h3>${film.title}</h3>
            <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
            <p><strong>Showtime:</strong> ${film.showtime}</p>
            <p><strong>Available Tickets:</strong> ${film.capacity - film.tickets_sold}</p>
          `;
          li.addEventListener('click', () => {
            fetch(`http://localhost:3000/films/${film.id}`)
              .then(response => response.json())
              .then(movie => {
                const remainingTickets = movie.capacity - movie.tickets_sold;
                availableTickets.textContent = remainingTickets;
  
                movieDetails.innerHTML = `
                  <img src="${movie.poster}" alt="${movie.title} poster" />
                  <h2>${movie.title}</h2>
                  <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                  <p><strong>Showtime:</strong> ${movie.showtime}</p>
                  <p><strong>Available Tickets:</strong> ${remainingTickets}</p>
                `;
              });
          });
          filmsList.appendChild(li);
        });
      });
  
    buyTicketButton.addEventListener('click', () => {
      const remainingTickets = parseInt(availableTickets.textContent);
      if (remainingTickets > 0) {
        availableTickets.textContent = remainingTickets - 1;
      }
      if (remainingTickets === 1) {
        buyTicketButton.textContent = 'Sold Out';
        buyTicketButton.disabled = true;
        filmsList.querySelectorAll('.film.item').forEach(filmItem => {
          if (parseInt(filmItem.querySelector('p:last-child').textContent.split(' ')[2]) === 0) {
            filmItem.classList.add('sold-out');
          }
        });
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
  
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => {
        films.forEach(film => {
          const li = document.createElement('li');
          li.classList.add('film', 'item');
          li.innerHTML = `
            <img src="${film.poster}" alt="${film.title} poster" />
            <h3>${film.title}</h3>
            <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
            <p><strong>Showtime:</strong> ${film.showtime}</p>
            <p><strong>Available Tickets:</strong> ${film.capacity - film.tickets_sold}</p>
            <button class="delete-button">Delete</button>
          `;
          li.querySelector('.delete-button').addEventListener('click', () => {
            fetch(`http://localhost:3000/films/${film.id}`, {
              method: 'DELETE'
            })
              .then(response => response.json())
              .then(() => {
                li.remove();
              });
          });
          filmsList.appendChild(li);
        });
      });
  });
  