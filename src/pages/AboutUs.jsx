import { AdvancedMarker, APIProvider, Map, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { toyService } from "../services/toy.service.js"
import { useState } from "react"

export function AboutUs() {

    const mapDefaultLoc = { lat: 32.0853, lng: 34.7818 }
    const [markers, setMarkers] = useState(toyService.getStoreLocations())

    function onMapClick(ev) {
        // setCoors(ev.detail.latLng)
        // ev.map.panTo(ev.detail.latLng)
        const newPos = ev.detail.latLng
        const updatedMarkers = [...markers, newPos]
        setMarkers(updatedMarkers)
        toyService.setStoreLocations(updatedMarkers) 
        ev.map.panTo(newPos)
    }

    const mapCenter = markers.length > 0 ? markers[0] : mapDefaultLoc

    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Magni aperiam quo veniam velit dolor reprehenderit,
                laudantium consequatur neque numquam labore quae.
                Accusamus libero perferendis ducimus? Alias unde hic
                quisquam doloremque.</p>
            <section className="google-map">
                <APIProvider apiKey={'AIzaSyBcLlKvJiWUP1ytSSJ3fbYlGiwZrdNGsQM'}>
                    <Map
                        mapId={'mapid-123'}
                        defaultZoom={8}
                        defaultCenter={mapCenter}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        // onClick={onMapClick}
                    >
                        {markers.map((pos, idx) => (
                            <AdvancedMarker
                                key={idx}
                                position={pos}
                                title={`Marker ${idx + 1}`}
                            >
                                <Pin
                                    background={'#22ccff'}
                                    borderColor={'#1e89a1'}
                                    glyphColor={'#fff'}
                                />
                            </AdvancedMarker>
                        ))}
                    </Map>
                </APIProvider>
            </section>
        </section>
    )
}
