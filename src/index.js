// your code here
// src/index.js
document.addEventListener('DOMContentLoaded', () => {
    fetchCakeDetails(1);
    fetchCakeMenu();
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', addReview);
    const descriptionForm = document.getElementById('description-form');
    descriptionForm.addEventListener('submit', updateDescription);
  });
  
  function fetchCakeDetails(id) {
    fetch(`http://localhost:3000/cakes/${id}`)
      .then(response => response.json())
      .then(cakeData => {
        displayCakeDetails(cakeData);
      })
      .catch(error => console.error('Error fetching cake details:', error));
  }
  
  function fetchCakeMenu() {
    fetch('http://localhost:3000/cakes')
      .then(response => response.json())
      .then(cakesData => {
        displayCakeMenu(cakesData);
      })
      .catch(error => console.error('Error fetching cake menu:', error));
  }
  
  function displayCakeDetails(cakeData) {
    const nameElement = document.getElementById('cake-name');
    const imageElement = document.getElementById('cake-image');
    const descriptionElement = document.getElementById('cake-description');
    const reviewsList = document.getElementById('review-list');
  
    nameElement.textContent = cakeData.name;
    imageElement.src = cakeData.image_url;
    descriptionElement.textContent = cakeData.description;
  
    reviewsList.innerHTML = '';
    cakeData.reviews.forEach(review => {
      const li = document.createElement('li');
      li.textContent = review;
      li.addEventListener('click', () => removeReview(review));
      reviewsList.appendChild(li);
    });
  }
  
  function displayCakeMenu(cakesData) {
    const cakeList = document.getElementById('cake-list');
    cakesData.forEach(cake => {
      const listItem = document.createElement('li');
      listItem.textContent = cake.name;
      listItem.addEventListener('click', () => fetchCakeDetails(cake.id));
      cakeList.appendChild(listItem);
    });
  }
  
  function addReview(event) {
    event.preventDefault();
    const reviewInput = document.getElementById('review');
    const content = reviewInput.value;
    const reviewsList = document.getElementById('review-list');
    const li = document.createElement('li');
    li.textContent = content;
    li.addEventListener('click', () => removeReview(content));
    reviewsList.appendChild(li);
    reviewInput.value = ''; // Clear input field after adding review
  }
  
  function removeReview(review) {
    const reviewToRemove = document.querySelector(`#review-list li`);
    if (reviewToRemove) {
      reviewToRemove.remove();
    }
  }
  
  function updateDescription(event) {
    event.preventDefault();
    const descriptionInput = document.getElementById('description');
    const newDescription = descriptionInput.value;
    const descriptionElement = document.getElementById('cake-description');
    descriptionElement.textContent = newDescription;
    descriptionInput.value = ''; // Clear input field after updating description
  }
  
