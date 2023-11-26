import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function GetIcon(_iconSize: L.PointExpression | undefined) {
  return L.icon({
    iconUrl:
      'https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png',
    iconSize: _iconSize,
  })
}

const DynamicMap = () => {
  const position = [10.540152787320812, -85.73263788124702]
  const size = { height: '100%', width: '100%' }

  return (
    <MapContainer
      style={size}
      center={position}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} icon={GetIcon([25, 40])}>
        <Popup>Azul Paraíso</Popup>
      </Marker>
    </MapContainer>
  )
}
export default DynamicMap
