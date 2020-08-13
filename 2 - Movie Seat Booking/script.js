const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.ocuppied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; // + sign transforms the string in a number

// Save selected movie index and price
function setMovieData(movieIndex) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
}

// Update total and count
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Load data from localstorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex);
  updateSelectedCountAndTotal();
});

// This approach is better than loop through all seats and add
// event listeners to every each of them
// Seat click event
container.addEventListener("click", (e) => {
  const { classList: targetClasses } = e.target;
  if (targetClasses.contains("seat") && !targetClasses.contains("occupied")) {
    targetClasses.toggle("selected");
    updateSelectedCountAndTotal();
  }
});

// Initial count and total set
updateSelectedCountAndTotal();
