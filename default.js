const server = "https://api.jikan.moe/v4";

document.addEventListener('DOMContentLoaded', function() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Tabs.init(document.querySelectorAll('.tabs'));
    loadPopular();
    loadGenres();
    loadList();
});


async function sendRequest(url, method, data){
    const options = {method};
    if(data){
        options.body = JSON.stringify(data);
        options.headers = {'Content-Type':'application/json'};
    }
    let response = await fetch(url, options);
    return response.json();
}