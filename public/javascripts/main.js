'use strict';

function main (id) {
  axios.get(`/api/book/${id}`).then(response => {
    const coords = response.data.book.location.coordinates;
    const location = { lat: coords[0], lng: coords[1] };
    const container = document.getElementById('map');
    const options = { zoom: 15, center: location };
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
function initialize () {
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    document.getElementById('city2').value = place.name;
    document.getElementById('cityLat').value = place.geometry.location.lat();
    document.getElementById('cityLng').value = place.geometry.location.lng();
  });
}

function searchLoaded (id) {
  const search = document.querySelector('.btn-search');

  function handleclick () {
    const text = document.querySelector('#my-search').value;
    document.getElementById('books').innerHTML = '';
    const body = {
      title: text
    };

    axios.post('/api/book', body)
      .then(res => {
        if (res.data.book.length === 0) {
          let newCharacterHtml = `<li>
          <p>There are no books that matches your search!</p></li>`;
          document.getElementById('books').innerHTML += newCharacterHtml;
        } else {
          for (let ix = 0; ix < res.data.book.length; ix++) {
            let newCharacterHtml = `
          <li>
            <p>Book: ${res.data.book[ix].title} | ${res.data.book[ix].author} </p>
            <p>Owner: ${res.data.book[ix].owner.username}</p>`;

            if (id) {
              newCharacterHtml += `<a href="/book/${res.data.book[ix]._id}"> Details </a>`;
            } else {
              newCharacterHtml += `<a href="/auth/login"> Details </a>`;
            }

            document.getElementById('books').innerHTML += newCharacterHtml;
          }
        }
      });
  }

  search.addEventListener('click', handleclick);
}
