import './sass/main.scss';
import PixabayApi from './pixabay-api';


fetch ('https://pixabay.com/api/?key=11538931-2af4b5ad07badda1fd47b2159&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1')
.then (response => response.json()).then(console.log);

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector ('.load-more');
const gallery = document.querySelector ('.gallery');
const pixabayApi = new PixabayApi();


loadMoreBtn.addEventListener ('click', onLoadMore)

form.addEventListener ('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    loadMoreBtn.classList.remove ('is-hidden');

    clearContainer();
    pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
    pixabayApi.resetPage ();
    pixabayApi.fetchPicture().then(containerMarkup);
    
};

function onLoadMore() {
    pixabayApi.fetchPicture().then(containerMarkup);

    
}

function containerMarkup (hits) {
    let hitsList = hits.map((elem) => { return `<div class="photo-card">
    <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy"  width = "320"/>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${elem.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${elem.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${elem.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${elem.downloads} </b>
      </p>
    </div>
  </div>`}).join('');

  gallery.insertAdjacentHTML ('beforeend', hitsList);

  

}

function clearContainer() {
    gallery.innerHTML = '';

  }

