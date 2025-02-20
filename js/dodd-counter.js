// for the footer deal of the day count

const deadline = new Date("Feb 1, 2025 23:59:59").getTime(); // Set your deal end date and time

function updateTimer() {
  const now = new Date().getTime();
  const timeLeft = deadline - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("day1").textContent = days;
    document.getElementById("hrs1").textContent = hours;
    document.getElementById("min1").textContent = minutes;
    document.getElementById("sec1").textContent = seconds;
  } else {
    // If time is up, display a message or take action
    document.querySelector(".product-timer").innerHTML = "<span>Deal expired!</span>";
    clearInterval(timerInterval); // Stop the interval
  }
}

// Call updateTimer every second
const timerInterval = setInterval(updateTimer, 1000);
