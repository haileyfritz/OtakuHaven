async function loadPopular(){
  try{
    let response = await fetch('https://api.jikan.moe/v4/top/anime');
    const result = await response.json();
    displayPopular(result);
  }catch(e){
      console.log(e);
    }
}
 
function displayPopular(obj){
    let obj2 = document.querySelector('#popular-div');
    const data = obj['data']; 
        let html = '';
        for (let i =0; i < 6; i++){
                html += ` 
            <span class = "anime-card" id = "popular-span">
                <a href = "description.html">
                <h4>${data[i].title}</h4>
                <div>
                    <img src = "${data[i].images.jpg.image_url}" class = "anime-img">
                </div>
            <span>${data[i].genres[0].name}</span>
            <span>${data[i].year}</span>
                </a>
            </span>`
        };
        obj2.innerHTML = html;

}

async function loadGenres(){
  try{
    const responseGenre = await fetch('https://api.jikan.moe/v4/genres/anime');
    const resultGenre = await responseGenre.json();
    displayGenres(resultGenre);
  }catch(e){
      console.log(e);
    }
}

function displayGenres(genre){
    let genre2 = document.querySelector('#genre-list');
    const dataGenre = genre['data']; 
        let htmlGenre = '';
        for (d of dataGenre){
                htmlGenre += ` 
            <span>
              <a href="${d.url}" id = ${d.name} >${d.name}</a>
            </span>`
        };
       genre2.innerHTML = htmlGenre;

}

loadGenres();


async function loadList(){
  try{
    let responseList = await fetch('https://api.jikan.moe/v4/top/anime');
    const resultList = await responseList.json();
    displayList(resultList);
  }catch(e){
      console.log(e);
    }
}
 
function displayList(list){
    let list2 = document.querySelector('#anime-list');
    const dataList = list['data']; 
        let htmlList = '';
        for (l of dataList){

                htmlList += ` 
<div>
              <a href = "description.html">
                <div class = "anime-box">
                  <div id = "anime-list-image">
                    <img src = "${l.images.jpg.image_url}" class = "anime-img">
                  </div>
                  <div>
                    <h4>${l.title}</h4>
                    <p>${l.synopsis}</p>
                    <p>${l.genres[0].name}</p>
                    <p>${l.year}</p>
                  </div>
                </div>
              </a>
            </div>`
        };
        list2.innerHTML = htmlList;

}

loadList(); 
