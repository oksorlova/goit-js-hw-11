const axios = require('axios');
import Notiflix from 'notiflix';

export default class PixabayApi {
    constructor() {
        this.query = '';
        this.page = 1;
    }

    fetchPicture() {
        return fetch (`https://pixabay.com/api/?key=11538931-2af4b5ad07badda1fd47b2159&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        
.then(response => response.json())
.then(data => {
    this.page += 1;

    if (data.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    if (data.hits.length === 0 && data.totalHits !== 0) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    
    

    return data.hits;

    
});
    }


// {
//     try {
//         const response = await axios.get(`https://pixabay.com/api/?key=11538931-2af4b5ad07badda1fd47b2159&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
//         .then (response => response.json())
//         .then(data => {
//             this.page += 1;
        
//             return data.hits;
//           })
//     } catch (error) {
//       console.error(error);
//     }
//   }



    resetPage () {
        this.page = 1;

    }

    get searchQuery() {
        return this.query;
    }

    set searchQuery (newQuery) {
        this.query = newQuery;
    }

}
