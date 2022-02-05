import './sass/main.scss';
import PixabayApi from './pixabay-api';
import Notiflix from 'notiflix';


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
  clearContainer();
  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
  pixabayApi.resetPage ();
pixabayApi.fetchPicture().then(hits => {
  containerMarkup(hits)
  console.log(pixabayApi.totalHits.totalHits)
  if (pixabayApi.totalHits.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden')
  }

  if (pixabayApi.totalHits.totalHits <= 40 && hits.length !== 0 ) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                                loadMoreBtn.classList.add ('is-hidden');
      }

      if (hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                  loadMoreBtn.classList.add ('is-hidden');
      }
});
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
