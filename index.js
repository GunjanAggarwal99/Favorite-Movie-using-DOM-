// Import stylesheets
import './style.css';

// Write Javascript code!
const addMovieModal = document.getElementById('add-modal');
const startAddBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelBtn = addMovieModal.querySelector('.btn--passive');
const addBtn = addMovieModal.querySelector('.btn--success');
const userInput = addMovieModal.querySelectorAll('input');
const emptyScreen = document.getElementById('entry-text');
const newList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];
const updateUi = () => {
  if (movies.length === 0) {
    emptyScreen.style.display = 'block';
  } else {
    emptyScreen.style.display = 'none';
  }
};
const cancelMovieDeletion = () => {
  backdropToggle();
  deleteMovieModal.classList.remove('visible');
};
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  newList.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUi();
};
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  backdropToggle();
  const cancelDeleteBtn = deleteMovieModal.querySelector('.btn--passive');
  let addDeleteBtn = deleteMovieModal.querySelector('.btn--danger');
  addDeleteBtn.replaceWith(addDeleteBtn.cloneNode(true));
  addDeleteBtn = deleteMovieModal.querySelector('.btn--danger');
  cancelDeleteBtn.removeEventListener('click', cancelMovieDeletion);
  cancelDeleteBtn.addEventListener('click', cancelMovieDeletion);
  addDeleteBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderMovieToScreen = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image"> 
  <img src='${imageUrl}' alt = '${title}'>
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  newList.append(newMovieElement);
};
const backdropToggle = () => {
  backdrop.classList.toggle('visible');
};
const clearMovieModal = () => {
  addMovieModal.classList.remove('visible');
};
const addMovieToggle = () => {
  addMovieModal.classList.add('visible');
  backdropToggle();
};
const clearInputhandler = () => {
  for (const userInp of userInput) {
    userInp.value = '';
  }
};
const cancelBtnHandler = () => {
  clearMovieModal();
  backdropToggle();
  clearInputhandler();
};
const addBtnHandler = () => {
  const titleValue = userInput[0].value;
  const imageUrlValue = userInput[1].value;
  const ratingValue = userInput[2].value;
  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please Enetr valid input');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  clearMovieModal();
  backdropToggle();
  clearInputhandler();
  renderMovieToScreen(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUi();
};
const backdropHandler = () => {
  clearMovieModal();
  cancelMovieDeletion();
  clearInputhandler();
};
startAddBtn.addEventListener('click', addMovieToggle);
backdrop.addEventListener('click', backdropHandler);
cancelBtn.addEventListener('click', cancelBtnHandler);
addBtn.addEventListener('click', addBtnHandler);
