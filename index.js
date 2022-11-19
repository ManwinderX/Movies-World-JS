//5e6f1e7705030a57d1cf8a0624b0f539

let movies;
const search = document.querySelector('.search__input');
const movieList = document.querySelector('.movies');

async function getMovies(search) {
    const fetchMovies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5e6f1e7705030a57d1cf8a0624b0f539&&query=${search}`);
    const moviesData = await fetchMovies.json();
    return moviesData.results;
}

async function renderMovies (filter) {
    var data = await getMovies(search.value);
    
    movieList.classList += ' movies__loading';

    movieList.classList.remove('movies__loading');

    if (filter === 'SORT_BY_NAME') {
        data.sort((a, b) => a.title.localeCompare(b.title))
         }
         else if (filter === 'SORT_BY_RATING') {
            data.sort((a, b) => b.vote_average - a.vote_average)
         }
         else if (filter === 'SORT_BY_DATE') {
            data.sort((a, b) => b.release_date - a.release_date)
         }

    movieList.innerHTML = data.map(movie => {
        const imageUrl = `https://image.tmdb.org/t/p/w1280` + movie.poster_path;
            return ` 
                     <div class="movie">
                     <div class="movie__header">
                            <figure class="movie__poster--wrapper">
                                 <img class="movie__poster" src="${imageUrl}" alt="">
                            </figure>
                     </div>
                     <div class="movie__body">
                             <span class="genre__tag">${movie.release_date}</span>
                             <div class="movie__title">${movie.title}</div>
                             <div class="movie__rating">Vote Average: ${movie.vote_average}</div>
                             <div class="release__year">Vote Count: ${movie.vote_count}</div>
                             <div class="release__year">Language: ${movie.original_language}</div>
                     </div>
                     </div>`
        }
    ).join("")
}

function filterMovies(event) {
    renderMovies(event.value)
}

getMovies();






