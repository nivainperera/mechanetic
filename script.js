// mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoibml2YWlucCIsImEiOiJja3NlZmhlZ24wenF5Mm5sY2xtdnEwYjA0In0.PBmSfHOGlBzOG4_fXD_zbw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [133.311278, -24.157649],
        zoom: 3
    });

    const toggleButton = document.getElementsByClassName('toggle-button')[0]
    const navbarLinks = document.getElementsByClassName('navbar-links')[0]

    toggleButton.addEventListener('click', () => {
     navbarLinks.classList.toggle('active')
})

// mapbox token
    map.on('load', () => {
        map.addSource('places', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Ballarat</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [143.850006, -37.549999]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Sydney Opera House</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [151.215256, -33.856159]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Great Barrier Reef</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [146.8145698649376, -18.002652407954614]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Sydney Harbour Bridge</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [151.210556, -33.852222]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Bondi Beach</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [151.274292, -33.890842]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Great Ocean Road</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [143.391618, -38.680564]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Twelve Apostles</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [143.1047311615103, -38.661064695294264]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Uluru</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [131.0369, -25.3444]
                        }
                    },

                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Surfers Paradise</strong>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [153.429642, -28.000767]
                        }
                    }
                ]
            }
        });
        // Add a layer showing the places.
        map.addLayer({
            'id': 'places',
            'type': 'circle',
            'source': 'places',
            'paint': {
                'circle-color': 'yellow',
                'circle-radius': 18,
                'circle-stroke-width': 5,
                'circle-stroke-color': 'black'
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'places', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)
    });
    
    
