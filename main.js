$(document).ready(()=> {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();    
        getMovies(searchText);
        e.preventDefault();
    });   //<!--<div class="col-md-3 container ">-->
});

function getMovies(searchText){  //gets the id from the html form e.g.'Home'
    console.log(searchText); //outputs test to the console
    axios.get('http://www.omdbapi.com?apikey=21f6d36a&s='+searchText) //My api key inc  
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `


    <div class="well text-center col-md-3 container card box-shadow">
      <img class="rounded mx-auto d-block" src="${movie.Poster}">
      <h5 class="movie-title-search">${movie.Title}</h5>
      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
    </div>

            `;
        }); //end of jQuery ForEach loop

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
};

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?apikey=21f6d36a&i='+movieId) //My api key inc  
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row container">
                    <div class="col-md-4 card box-shadow">
                        <img src="${movie.Poster}" class="thumbnail rounded mx-auto d-block">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well container">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">IMDB info...</a>
                    <a href="index.html" class="btn btn-default">Go Back to Search</a>
                    </div>
                </div>

            `;
            $('#movie').html(output);
        })
        .catch((err) => {
         console.log(err);
        });
}
