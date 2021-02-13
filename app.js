document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key == 'Enter')
    document.getElementById("searchBtn").click();
});

const getInput = () => {
    const inputValue = document.getElementById('searchInput').value;
    const url = `https://api.lyrics.ovh/suggest/${inputValue}`
    toggleBtn();
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaySongs(data.data);
        })
        .catch(error => {
            alert('Sorry! Search Result Not Found, Please try again later!!!')
        });
}

const displaySongs = songs => {
    const songContainer = document.getElementById('songContainer');
    songContainer.innerText = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <audio controls>
            <source src="${song.preview}" type="audio/ogg">
        </audio>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;

        songContainer.append(songDiv);
        toggleBtn();
        document.getElementById('lyrics').innerText = '';
        

    });
}
const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lyrics = document.getElementById('lyrics');
            lyrics.innerText = data.lyrics
        })
        .catch(error => {
            alert('Sorry! I failed to load lyrics, Please try again later!!!')
        });
    lyrics.innerText = '';
}
const toggleBtn = () => {
        const loadingSpinner = document.getElementById("loadingSpinner");
        loadingSpinner.classList.toggle('invisible');
}