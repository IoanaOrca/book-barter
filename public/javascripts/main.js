'use strict';

function main (id) {
  axios.get(`/api/book/${id}`).then(response => {
    const coords = response.data.book.owner.location.coordinates;
    const location = { lat: coords[0], lng: coords[1] };
    const container = document.getElementById('map');
    const options = { zoom: 10, center: location };
    const map = new google.maps.Map(container, options);

    addMarker(map, location, 'book');
  });

  function addMarker (map, location, title) {
    const markerOptions = {
      position: location,
      title: title
    };
    const myMarker = new google.maps.Marker(markerOptions);
    myMarker.setMap(map);
    return myMarker;
  }
}

function searchLoaded () {
  const search = document.querySelector('.btn-search');

  function handleclick () {
    const text = document.querySelector('#my-search').value;
    document.getElementById('books').innerHTML = '';
    const body = {
      title: text
    };

    axios.post('/api/book', body)
      .then(res => {
        for (let ix = 0; ix < res.data.book.length; ix++) {
          let newCharacterHtml = `
          <li>
            <p>Book: ${res.data.book[ix].title} | ${res.data.book[ix].author} </p>
            <p>Owner: ${res.data.book[ix].owner.username}</p>
            <a href="/book/${res.data.book[ix]._id}"> Details </a>  
          </li>`;
          document.getElementById('books').innerHTML += newCharacterHtml;
        }
      });
  }

  search.addEventListener('click', handleclick);
}
