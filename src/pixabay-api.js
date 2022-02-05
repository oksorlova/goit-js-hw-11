const axios = require('axios');
import Notiflix from 'notiflix';

export default class PixabayApi {
    constructor() {
        this.query = '';
        this.page = 1;
    }

    async fetchPicture() {
        try {
          const response = await axios.get('https://pixabay.com/api/', {
            params: {
              key: '11538931-2af4b5ad07badda1fd47b2159',
              q: this.query,
              image_type: 'photo',
              orientation: 'horizontal',
              safesearch: true,
              page: this.page,
              per_page: 40,
            },
          });
          this.page += 1;
          this.totalHits = response.data;

          console.log(response.data.hits)

          if (response.data.hits.length === 0) {
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      
                }

                if (response.data.totalHits.length === 0) {
                            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                            
                        }

          return response.data.hits;

          

        } catch (error) {
          console.error(error);
        }
      }
      resetPage() {
        this.page = 1;
      }
    
      get searchQuery() {
        return this.query;
      }
    
      set searchQuery(newQuery) {
        this.query = newQuery;
      }
    }

//     fetchPicture() {
//         return fetch (`https://pixabay.com/api/?key=11538931-2af4b5ad07badda1fd47b2159&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        
// .then(response => response.json())
// .then(data => {
//     this.page += 1;

//     if (data.totalHits === 0) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }

//     if (data.hits.length === 0 && data.totalHits !== 0) {
//         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//     }
    
    

//     return data.hits;

    
// });
//     }


// // {
// //     try {
// //         const response = await axios.get(`https://pixabay.com/api/?key=11538931-2af4b5ad07badda1fd47b2159&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
// //         .then (response => response.json())
// //         .then(data => {
// //             this.page += 1;
        
// //             return data.hits;
// //           })
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }



//     resetPage () {
//         this.page = 1;

//     }

//     get searchQuery() {
//         return this.query;
//     }

//     set searchQuery (newQuery) {
//         this.query = newQuery;
//     }

// }



// if (response.data.hits === 0 && response.data !== 0) {
//     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//     loadMoreBtn.classList.add ('is-hidden');
// }