'use strict';

function main () {
  // -- utility functions
  function getUserLocation () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const userPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            resolve(userPosition);
          },
          () => {
            resolve();
          }
        );
      } else {
        resolve();
      }
    });
  }

  function addMarker (map, location, title) {
    const markerOptions = {
      position: location,
      title: title
    };
    const myMarker = new google.maps.Marker(markerOptions);
    myMarker.setMap(map);
    return myMarker;
  }

  // -- build the map
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const container = document.getElementById('map');
  const options = {
    zoom: 15,
    center: ironhackBCN
  };
  const map = new google.maps.Map(container, options);

  //   axios.get('/book/json').then(response => {
  //     response.data.forEach(user => {
  //       console.log(user);
  //     });
  //   });

  getUserLocation().then(userLocation => {
    if (userLocation) {
      addMarker(map, userLocation, 'your location');
    }
  });
}

window.addEventListener('load', main);
