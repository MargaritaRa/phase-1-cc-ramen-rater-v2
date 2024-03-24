// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;
    const newRamen = { name, restaurant, image, rating, comment };
    await displayNewRamen(newRamen);
    form.reset();
  });
};

const displayNewRamen = async (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

const displayRamens = async () => {
  try {
    const response = await fetch('http://localhost:3000/ramens');
    const ramens = await response.json();
    ramens.forEach((ramen) => displayNewRamen(ramen));
  } catch (error) {
    console.error('Error fetching ramen data:', error);
  }
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
