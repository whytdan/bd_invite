// Array to store the paths to your images
const images = [
  './assets/23.gif',
  './assets/plant.gif',
  './assets/21.gif',
  './assets/24.gif',
  './assets/cat.gif',
  './assets/anime.gif',
  './assets/sasuke.gif',
  './assets/nokia.gif',
  './assets/pikachu.gif',
  './assets/statue.gif',
  './assets/diamond.gif',
];

let usedImages = [];

// Function to get the guest's name from the query string
function getGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('guest') || 'Guest'; // If no guest param, fallback to 'Guest'
}

// Function to set the guest name in the span
function setGuestName() {
  const guestName = getGuestName();
  document.getElementById('guest').textContent = guestName;
}

// Function to select a random image that hasn't been used yet
function getRandomImage() {
  if (usedImages.length === images.length) {
    // All images have been shown, reset the usedImages array
    usedImages = [];
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * images.length);
  } while (usedImages.includes(randomIndex));

  usedImages.push(randomIndex);
  return images[randomIndex];
}

// Function to change the image
function changeImage() {
  const imgElement = document.getElementById('visuals_img');
  const newImage = getRandomImage();
  imgElement.src = newImage;
  imgElement.classList.remove('spin'); // Reset the animation
  void imgElement.offsetWidth; // Trigger reflow for the CSS animation to restart
  imgElement.classList.add('spin');
}

// Countdown Timer Function
function updateCountdown() {
  const birthday = new Date('2024-10-11T00:00:00+06:00'); // Set to 11th October GMT+6
  const now = new Date();
  const timeDiff = birthday - now;

  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById(
      'countdown_timer'
    ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    // If today is the birthday, show the confetti
    showConfetti();
    document.getElementById('countdown_timer').innerHTML = "It's my birthday!";
  }
}

// Show confetti when it's 11th October
function showConfetti() {
  const confettiElements = document.querySelectorAll('.confetti');
  confettiElements.forEach((el) => {
    el.classList.remove('hidden');
  });
}

// Set the default image when the page loads
window.onload = function () {
  setGuestName(); // Set the guest name

  const imgElement = document.getElementById('visuals_img');
  imgElement.src = images[0]; // Set the default image to the first one
  usedImages.push(0); // Mark the first image as used

  // Start interval to change the image every 2 seconds after 2 seconds
  setTimeout(function () {
    imageInterval = setInterval(changeImage, 2000);
  }, 2000);

  // Start countdown timer and check every second
  setInterval(updateCountdown, 1000);
};
