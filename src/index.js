import './sass/main.scss';
import PixabayApi from './pixabay-api';
import Notiflix from 'notiflix';


const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector ('.load-more');
const gallery = document.querySelector ('.gallery');
const pixabayApi = new PixabayApi();


loadMoreBtn.addEventListener ('click', onLoadMore)

form.addEventListener ('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
  pixabayApi.resetPage ();
await pixabayApi.fetchPicture().then( hits => {
  clearContainer();
 containerMarkup(hits)
    loadMoreBtn.classList.remove('is-hidden')
  
  

  if (hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              loadMoreBtn.classList.add ('is-hidden');
  }

  
  
      
});
}


    

async function onLoadMore() {
    await pixabayApi.fetchPicture().then( hits => {
       containerMarkup(hits)

       
  
})

}

async function containerMarkup (hits) {
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

  await gallery.insertAdjacentHTML ('beforeend', hitsList);

  let maxPage = Math.ceil(pixabayApi.totalHits.totalHits / 40)
  if (maxPage === pixabayApi.page - 1) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.classList.add('is-hidden')

 


}
}

function clearContainer() {
    gallery.innerHTML = '';

  }

