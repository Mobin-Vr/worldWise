import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../Hooks/useGeoLocation';
import styles from './Map.module.css';
import Button from './Button';

import {
   MapContainer,
   TileLayer,
   Marker,
   Popup,
   useMap,
   useMapEvents,
} from 'react-leaflet';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
   const { cities } = useCities();
   const [mapPosition, setMapPosition] = useState([40, 0]);
   const [mapLat, mapLng] = useUrlPosition();
   const {
      isLoading: isLoadingPosition,
      position: geoLocationPosition,
      getPosition,
   } = useGeolocation();

   useEffect(() => {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
   }, [mapLat, mapLng]);

   useEffect(() => {
      if (geoLocationPosition)
         setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
   }, [geoLocationPosition]);

   return (
      <div className={styles.mapContainer}>
         {!geoLocationPosition && (
            <Button type='position' onClick={getPosition}>
               {isLoadingPosition ? 'Loading...' : 'Get your position'}
            </Button>
         )}
         <MapContainer
            center={mapPosition}
            zoom={8}
            scrollWheelZoom={true}
            className={styles.map}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />

            {cities.map((city) => (
               <Marker
                  position={[city.position.lat, city.position.lng]}
                  key={city.id}
               >
                  <Popup>
                     <span className={styles.emoji}>{city.emoji}</span>
                     <span>{city.cityName}</span>
                  </Popup>
               </Marker>
            ))}
            <ChangeCenter position={mapPosition} />
            <DetectClick />
         </MapContainer>
      </div>
   );
}

function ChangeCenter({ position }) {
   const map = useMap();
   map.setView(position);

   return null;
}

function DetectClick() {
   const navigate = useNavigate();
   useMapEvents({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
   });
}

export default Map;
