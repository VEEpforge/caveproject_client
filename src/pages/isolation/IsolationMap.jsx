import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const IsolationMap = () => {
  return (
    <>
			
			<MapContainer center={[14.1651, 121.2402]} zoom={13}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			</MapContainer>
			
		</>
  )
}

export default IsolationMap