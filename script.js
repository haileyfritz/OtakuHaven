function objectLength(object){
    let length = 0;

    for (let key in object){
        if (object.hasOwnProperty(key))
            length++;
    }

    return length;
}

async function loadAnime(){
    let response = await fetch(`https://api.jikan.moe/v4/top/anime`);

    let result = await response.json();
  
    displayAnime(result);
}

function displayAnime(animeList){
    let data = animeList['data'];
    let popularCount = 0;
    let newCount = 0;
    let oldCount = 0;
      
      for (let item of data){
        let genreCount = (objectLength(`${item.genres}`) + 1) / 16;
        
        let rating = `${item.score}`;
  
        if (rating >= 9 && popularCount < 7){
            displayHomeAnime(item, genreCount, 'Popular')
            popularCount++;
        }
        
        let year = `${item.year}`;
        
        let newYear = 2015;
        
        if (year >= newYear && newCount < 7){
            displayHomeAnime(item, genreCount, 'New')
            newCount++;
        }
    
        let oldYear = 2015;
          
        if (year < oldYear && oldCount < 7){
            displayHomeAnime(item, genreCount, 'Old')
            oldCount++;
        }
      }
}

function displayHomeAnime(item, genreCount, category){
    let listing;
  
    if (category == 'Popular')
      listing = document.querySelector('.popular-content');
      
    if (category == 'New')
      listing = document.querySelector('.new-content');

    if (category == 'Old')
      listing = document.querySelector('.old-school-content');
  
    if (genreCount == 1){
      listing.innerHTML+=`<span class = "anime-card">
                          <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                            <h4>${item.title}</h4>
                            <div>
                              <img src = ${item.images.jpg.image_url} class = "anime-img">
                            </div>
                            <p>Genre: ${item.genres[0].name}</p>
                            <p>Year: ${item.year}</p>
                            <p>Episodes: ${item.episodes}</p>
                          </a>
                        </span>`;
    }

    if (genreCount == 2){
      listing.innerHTML+=`<span class = "anime-card">
                          <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                            <h4>${item.title}</h4>
                            <div>
                              <img src = ${item.images.jpg.image_url} class = "anime-img">
                            </div>
                            <p>Genre(s): ${item.genres[0].name}, ${item.genres[1].name}</p>
                            <p>Year: ${item.year}</p>
                            <p>Episodes: ${item.episodes}</p>
                          </a>
                        </span>`;
    }

    if (genreCount == 3){
      listing.innerHTML+=`<span class = "anime-card">
                          <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                            <h4>${item.title}</h4>
                            <div>
                              <img src = ${item.images.jpg.image_url} class = "anime-img">
                            </div>
                            <p>Genre(s): ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}</p>
                            <p>Year: ${item.year}</p>
                            <p>Episodes: ${item.episodes}</p>
                          </a>
                        </span>`;
    }

    if (genreCount == 4){
      listing.innerHTML+=`<span class = "anime-card">
                          <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                            <h4>${item.title}</h4>
                            <div>
                              <img src = ${item.images.jpg.image_url} class = "anime-img">
                            </div>
                            <p>Genre(s): ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}, ${item.genres[3].name}</p>
                            <p>Year: ${item.year}</p>
                            <p>Episodes: ${item.episodes}</p>
                          </a>
                        </span>`;
    }

    if (genreCount == 5){
      listing.innerHTML+=`<span class = "anime-card">
                          <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                            <h4>${item.title}</h4>
                            <div>
                              <img src = ${item.images.jpg.image_url} class = "anime-img">
                            </div>
                            <p>Genre(s): ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}, ${item.genres[3].name}, ${item.genres[4].name}</p>
                            <p>Year: ${item.year}</p>
                            <p>Episodes: ${item.episodes}</p>
                          </a>
                        </span>`;
    }
}

function displayHomePage(){
    let home = document.querySelector("#home-page");
    home.style.display = 'block';
    
    let genrePage = document.querySelector("#genre-page");
    genrePage.style.display = 'none';

    let description = document.querySelector("#description");
    description.style.display = 'none';

    let listing1 = document.querySelector('.popular-content');
    listing1.innerHTML = '';

    let listing2 = document.querySelector('.new-content');
    listing2.innerHTML = '';

    let listing3 = document.querySelector('.old-school-content');
    listing3.innerHTML = '';
  
    loadAnime();
}

displayHomePage()

function loadGenrePage(){
    let home = document.querySelector("#home-page");
    home.style.display = 'none';

    let genrePage = document.querySelector("#genre-page");
    genrePage.style.display = 'block';
    
    let description = document.querySelector("#description");
    description.style.display = 'none';
}

function displayGenrePage(){
    let home = document.querySelector("#home-page");
    home.style.display = 'none';

    let genrePage = document.querySelector("#genre-page");
    genrePage.style.display = 'block';
    
    let description = document.querySelector("#description");
    description.style.display = 'none';
}

async function loadGenreList(category){
    let response = await fetch(`https://api.jikan.moe/v4/top/anime`);

    let result = await response.json();
  
    displayAnimeList(result, category);
}

function displayGenrePage(category){
    let home = document.querySelector("#home-page");
    home.style.display = 'none';

    let genrePage = document.querySelector("#genre-page");
    genrePage.style.display = 'block';
    
    let description = document.querySelector("#description");
    description.style.display = 'none';

    let listing = document.querySelector('#anime-list');
    listing.innerHTML = '';
  
    loadGenreList(category);
}

function displayAnimeList(animeList, category){
    let data = animeList['data'];
    
    let listing = document.querySelector('#anime-list');
    listing.innerHTML+= `<div>
                          <h2>${category}</h2>
                        </div>`
    
    for (let item of data){
        let genreCount = (objectLength(`${item.genres}`) + 1) / 16;
        
        if (category === "Popular"){
          let rating = `${item.score}`;
    
          if (rating >= 9)
              displayListItem(item, category, genreCount);
        }
        else{
              let year = `${item.year}`;

              if (category === "New"){
                  let newYear = 2015;
              
                  if (year >= newYear)
                      displayListItem(item, category, genreCount);
              }
              else{
                    if (category === "Old School"){
                        let oldYear = 2015;
                
                        if (year < oldYear)
                            displayListItem(item, category, genreCount);
                  }
                  else{
                        let count = 0;
          
                        for (let i = 0; i < genreCount; i++){
                            let genre = `${item.genres[i].name}`;
                            
                            if (genre === category)
                                displayListItem(item, category, genreCount);
                        }
                      }
                  }
            }
    }
}

function displayListItem(item, category, genreCount){
    let listing = document.querySelector('#anime-list');
    //console.log(item);
    
    if (genreCount == 1){
      listing.innerHTML+=`<div>
                <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                  <div class = "anime-box">
                    <div id = "anime-list-image">
                      <img src = "${item.images.jpg.image_url}" class = "anime-img">
                    </div>
                    <div>
                      <h4>${item.title}</h4>
                      <p>Description: ${item.synopsis}</p>
                      <p>Genre: ${item.genres[0].name}</p>
                      <p>Year: ${item.year}</p>
                      <p>Rating: ${item.score} / 10</p>
                    </div>
                  </div>
                </a>
              </div>`;
    }

    if (genreCount == 2){
      listing.innerHTML+=`<div>
                <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                  <div class = "anime-box">
                    <div id = "anime-list-image">
                      <img src = "${item.images.jpg.image_url}" class = "anime-img">
                    </div>
                    <div>
                      <h4>${item.title}</h4>
                      <p>Description: ${item.synopsis}</p>
                      <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}</p>
                      <p>Year: ${item.year}</p>
                      <p>Rating: ${item.score} / 10</p>
                    </div>
                  </div>
                </a>
              </div>`;
    }

    if (genreCount == 3){
      listing.innerHTML+=`<div>
                <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                  <div class = "anime-box">
                    <div id = "anime-list-image">
                      <img src = "${item.images.jpg.image_url}" class = "anime-img">
                    </div>
                    <div>
                      <h4>${item.title}</h4>
                      <p>Description: ${item.synopsis}</p>
                      <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}</p>
                      <p>Year: ${item.year}</p>
                      <p>Rating: ${item.score} / 10</p>
                    </div>
                  </div>
                </a>
              </div>`;
    }

    if (genreCount == 4){
      listing.innerHTML+=`<div>
                <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                  <div class = "anime-box">
                    <div id = "anime-list-image">
                      <img src = "${item.images.jpg.image_url}" class = "anime-img">
                    </div>
                    <div>
                      <h4>${item.title}</h4>
                      <p>Description: ${item.synopsis}</p>
                      <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}, ${item.genres[3].name}</p>
                      <p>Year: ${item.year}</p>
                      <p>Rating: ${item.score} / 10</p>
                    </div>
                  </div>
                </a>
              </div>`;
    }

    if (genreCount == 5){
      listing.innerHTML+=`<div>
                <a href = "#description" onclick = "displayAnimeDescription(${item.mal_id})">
                  <div class = "anime-box">
                    <div id = "anime-list-image">
                      <img src = "${item.images.jpg.image_url}" class = "anime-img">
                    </div>
                    <div>
                      <h4>${item.title}</h4>
                      <p>Description: ${item.synopsis}</p>
                      <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}, ${item.genres[3].name}, ${item.genres[4].name}</p>
                      <p>Year: ${item.year}</p>
                      <p>Rating: ${item.score} / 10</p>
                    </div>
                  </div>
                </a>
              </div>`;
    }
}

async function loadList(option, id){
    let response = await fetch(`https://api.jikan.moe/v4/top/anime`);

    let result = await response.json();
  
    if (option == 1)  
      searchResult(result, 0);

    if (option == 2)
      searchByID(result, id);
}

function searchAnime(){
    let home = document.querySelector("#home-page");
    home.style.display = 'none';

    let genrePage = document.querySelector("#genre-page");
    genrePage.style.display = 'none';

    let description = document.querySelector("#description");
    description.style.display = 'block';

    let listing = document.querySelector('#description');
    listing.innerHTML = '';
  
    loadList(1, null);
}

function searchResult(animeList, option, name){
    let searchInput = document.querySelector("#search-movie").value;

    let data = animeList['data'];
  
    let found = 'false';
    
    for (let item of data){
        let genreCount = (objectLength(`${item.genres}`) + 1) / 16;
      
        let anime = `${item.title}`.toLowerCase();
        if (searchInput.toLowerCase() == anime){
          displayAnimeInfo(item, genreCount);
          found = 'true';
        }
    }

    if (found == 'false'){
        displayAnimeInfo(-1, 0);
    }
}

function searchByID(animeList, id){
    let data = animeList['data'];

    let found = 'false';

    for (let item of data){
        let genreCount = (objectLength(`${item.genres}`) + 1) / 16;
        
        let currId = `${item.mal_id}`;
        if (id == currId){
            displayAnimeInfo(item, genreCount);
            found = 'true';
        }
    }

    if (found == 'false'){
        displayAnimeInfo(-1, 0);
    }
}

function displayAnimeDescription(id){
    let home = document.querySelector("#home-page");
    home.style.display = 'none';

    let genrePage = document.querySelector("#genre-page");
    genrePage.style.display = 'none';

    let description = document.querySelector("#description");
    description.style.display = 'block';

    let listing = document.querySelector('#description');
    listing.innerHTML = '';
  
    loadList(2, id);
}

function displayAnimeInfo(item, genreCount){
    let listing = document.querySelector('#description');

    if (item == -1){
        listing.innerHTML+=`<div>
                              <h1>Anime was not found</h1>
                            </div>`;
    }
    else{
        if (genreCount == 1){
            listing.innerHTML+=`<div>
                                  <h2>${item.title}</h2>
                                </div>
                                <div class = "anime-description">
                                  <div id = "anime-info-image">
                                    <img src = "${item.images.jpg.image_url}">
                                  </div>
                                  <div>
                                    <p>Description: ${item.synopsis}</p>
                                  </div>
                                </div>
                                <div class = "anime-info">
                                  <p>Genre: ${item.genres[0].name}</p>
                                  <p>Year: ${item.year}</p>
                                  <p>Episodes: ${item.episodes}</p>
                                  <p>Duration: ${item.duration}</p>
                                  <p>Rating: ${item.score}</p>
                                  <p>Rated: ${item.rating}</p>
                                </div>`;
        }

        if (genreCount == 2){
            listing.innerHTML+=`<div>
                                  <h2>${item.title}</h2>
                                </div>
                                <div class = "anime-description">
                                  <div id = "anime-info-image">
                                    <img src = "${item.images.jpg.image_url}">
                                  </div>
                                  <div>
                                    <p>Description: ${item.synopsis}</p>
                                  </div>
                                </div>
                                <div class = "anime-info">
                                  <p>Genres: ${item.genres[0].name}, ${item.genres[1].name}</p>
                                  <p>Year: ${item.year}</p>
                                  <p>Episodes: ${item.episodes}</p>
                                  <p>Duration: ${item.duration}</p>
                                  <p>Rating: ${item.score}</p>
                                  <p>Rated: ${item.rating}</p>
                                </div>`;
        }

        if (genreCount == 3){
            listing.innerHTML+=`<div>
                                  <h2>${item.title}</h2>
                                </div>
                                <div class = "anime-description">
                                  <div id = "anime-info-image">
                                    <img src = "${item.images.jpg.image_url}">
                                  </div>
                                  <div>
                                    <p>Description: ${item.synopsis}</p>
                                  </div>
                                </div>
                                <div class = "anime-info">
                                  <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}</p>
                                  <p>Year: ${item.year}</p>
                                  <p>Episodes: ${item.episodes}</p>
                                  <p>Duration: ${item.duration}</p>
                                  <p>Rating: ${item.score}</p>
                                  <p>Rated: ${item.rating}</p>
                                </div>`;
        }

        if (genreCount == 4){
            listing.innerHTML+=`<div>
                                  <h2>${item.title}</h2>
                                </div>
                                <div class = "anime-description">
                                  <div id = "anime-info-image">
                                    <img src = "${item.images.jpg.image_url}">
                                  </div>
                                  <div>
                                    <p>Description: ${item.synopsis}</p>
                                  </div>
                                </div>
                                <div class = "anime-info">
                                  <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}, ${item.genres[3].name}</p>
                                  <p>Year: ${item.year}</p>
                                  <p>Episodes: ${item.episodes}</p>
                                  <p>Duration: ${item.duration}</p>
                                  <p>Rating: ${item.score}</p>
                                  <p>Rated: ${item.rating}</p>
                                </div>`;
        }

        if (genreCount == 5){
            listing.innerHTML+=`<div>
                                  <h2>${item.title}</h2>
                                </div>
                                <div class = "anime-description">
                                  <div id = "anime-info-image">
                                    <img src = "${item.images.jpg.image_url}">
                                  </div>
                                  <div>
                                    <p>Description: ${item.synopsis}</p>
                                  </div>
                                </div>
                                <div class = "anime-info">
                                  <p>Genre: ${item.genres[0].name}, ${item.genres[1].name}, ${item.genres[2].name}, ${item.genres[3].name}, ${item.genres[4].name}</p>
                                  <p>Year: ${item.year}</p>
                                  <p>Episodes: ${item.episodes}</p>
                                  <p>Duration: ${item.duration}</p>
                                  <p>Rating: ${item.score}</p>
                                  <p>Rated: ${item.rating}</p>
                                </div>`;
        }
    }
}
