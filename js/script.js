// fetch("https://musicdemons.com/api/v1/artist", { mode: "cors" })
//       .then(resp => resp.json())
//       .then(data => console.log(data));


const emptyList = (listToEmpty) => {
          while (listToEmpty.hasChildNodes()) {
            listToEmpty.removeChild(listToEmpty.lastChild);
          }

}

const createResultList = results => { 
        console.log(`argument of results : ${results}`)
        let liste = document.querySelector('.results');
        emptyList(liste);

        results.forEach(artist => {
                let artis = document.createElement("li");
                artis.id = artist.id; 
                artis.innerHTML += `
                ${artist.name}
                ` 
                liste.appendChild(artis);
                // console.log(artis);
                artis.addEventListener("click", showSongs);  
              })
};




const showSongs = (event) => {
            emptyList(document.querySelector(".songs"));

            const clickedArtist = event.currentTarget;

            fetch(`https://musicdemons.com/api/v1/artist/${clickedArtist.id}/songs`, {method : "GET"})
                    .then((songs) => songs.json())
                    .then((jsonsongs) => jsonsongs.forEach(song => {
                        console.log(song);
                        document.querySelector(".songs").innerHTML += `
                              <li>${song.title}</li>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/${song.youtube_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                              `})
                          )
            document.querySelector(".artist").innerHTML = `
              ${clickedArtist.textContent}  `
}


const search = async (typeLetters) => {
  let response = await fetch('https://musicdemons.com/api/v1/artist/autocomplete', {
      method: "POST", 
      headers: {
          // 'Accept': 'application/json, text/plain, */*',
          "Content-Type": "application/x-www-form-urlencoded"               
      },
      body: `name=${typeLetters}`
})
      response = await response.json();
      createResultList(response);

}


// const search = typeLetters => {
//             fetch('https://musicdemons.com/api/v1/artist/autocomplete', {
//                 method: "POST", 
//                 headers: {
//                     // 'Accept': 'application/json, text/plain, */*',
//                     "Content-Type": "application/x-www-form-urlencoded"               
//                 },
//                 body: `name=${typeLetters}`
//           })
//           .then((res) => res.json())
//           .then((data) => createResultList(data))
// }




const handleKeyUpSearch = e => {
                const input = e.currentTarget; 
                search(input.value);
};



const start = () => {
                document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
             };

start();
