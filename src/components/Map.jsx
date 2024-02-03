import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import Link from 'next/link';
export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}
// 6.856560, 106.957705

export default function Map({ lan = '-6.8520528', lon = '107.5807488', coordinates }) {
  const [geoData, setGeoData] = useState({ lat: -6.924974, lng: 106.931730 });

  const center = [lan, lon];

  console.log('map coordinats ')
  console.log(coordinates)
  return (
    <MapContainer center={center} zoom={1} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        coordinates?.map((data, index) => {
          return (
            <Marker position={[data.latitude, data.longitude]} >
              <Popup>
                {data.personal_data?.name} <br />
                {data.updated_at} <br />
                <Link href={'/headmaster/daily-report/subordinate/' + data.id} target='_blank'>
                  Lihat Laporan
                </Link>
              </Popup>
            </Marker>
          )
        })
      }

      <ChangeView coords={center} />
    </MapContainer>
  );
}
