import { AdvancedMarker, APIProvider, Map, Pin, useAdvancedMarkerRef, useMap } from "@vis.gl/react-google-maps"
import { toyService } from "../services/toy.service.js"
import { useRef, useState } from "react"

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API    
                 
//     const script = document.createElement('script');
// script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
// document.head.appendChild(script);

export function AboutUs() {

    const mapDefaultLoc = { lat: 32.0853, lng: 34.7818 }
    const [markers, setMarkers] = useState(toyService.getStoreLocations())

    const branches = [
        {
            city: 'Haifa',
            id: 101,
            address: 'shderot hanasi 45',
            position: {
                lat: 32.820789,
                lng: 34.963488,
            },
        },
        {
            city: 'Tel Aviv',
            id: 102,
            address: 'shderot rotchild 5',
            position: {
                lat: 32.071035,
                lng: 34.779118,
            },
        },
        {
            city: 'Jerusalem',
            address: 'begin 20',
            id: 103,
            position: {
                lat: 31.773362,
                lng: 35.221193,
            },
        },
    ]

    function onMapClick(ev) {
        ev.map.panTo(ev.detail.latLng)
        ev.map.setZoom(11)
    }

    const mapCenter = markers.length > 0 ? markers[0] : mapDefaultLoc

    return (
        <section className="about">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Magni aperiam quo veniam velit dolor reprehenderit,
                laudantium consequatur neque numquam labore quae.
                Accusamus libero perferendis ducimus? Alias unde hic
                quisquam doloremque.</p>

            <span>Store locations:</span>
            <section className="google-map">
                <APIProvider apiKey={API_KEY}>
                    <Map
                        mapId={'mapid-123'}
                        defaultZoom={8}
                        defaultCenter={mapCenter}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        onClick={onMapClick}
                        onLoad={mapInstance => (mapRef.current = mapInstance)}
                    >
                        {branches.map((branch, idx) => (
                            <AdvancedMarker
                                key={idx}
                                position={branch.position}
                                title={branch.address}
                            >
                                <Pin
                                    background={'#22ccff'}
                                    borderColor={'#1e89a1'}
                                    glyphColor={'#fff'}
                                />
                            </AdvancedMarker>
                        ))}

                        <MapButtons branches={branches} />
                    </Map>
                </APIProvider>
            </section>
        </section>
    )
}

function MapButtons({ branches }) {
    const map = useMap()

    function onBranchClick(branch) {
        map.panTo(branch.position)
        map.setZoom(11)
    }

    return (
        <div className="branch-buttons">
            {branches.map(branch => (
                <button
                    key={branch.city}
                    className="btn"
                    onClick={() => onBranchClick(branch)}
                >
                    {branch.city}
                </button>
            ))}
        </div>
    )
}

    // const [coords, setCoords] = useState(mapDefaultLoc)

    // function onMapClick(ev) {
        // setCoors(ev.detail.latLng)
        // ev.map.panTo(ev.detail.latLng)
    //     const newPos = ev.detail.latLng
    //     const updatedMarkers = [...markers, newPos]
    //     setMarkers(updatedMarkers)
    //     toyService.setStoreLocations(updatedMarkers) 
    //     ev.map.panTo(newPos)
    // }