import { MapContainer, TileLayer, Polygon, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { provinces } from '../../constants/4AProvincesGeoJSON'
import { caves } from '../../constants/caves'

const IsolationMap = () => {
  return (
    <>
			<MapContainer center={[14.1651, 121.2402]} zoom={15} zoomControl>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{/* <TileLayer
					url='http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}'
					subdomains={['mt0','mt1','mt2','mt3']}
				/> */}
				{
					provinces.features.map((province) => {
						var coordinates;
						// Polygon
						if(province.geometry.type === 'Polygon') coordinates = province.geometry.coordinates[0].map((item) => [item[1], item[0]]);
						// Multipolygon
						else coordinates = province.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

						return (<Polygon
							pathOptions={{
								fillColor: '#168b46',
								fillOpacity: 0.7,
								weight: 2,
								opacity: 1,
								dashArray: 3,
								color: 'white'
							}}
							positions={coordinates}
							eventHandlers={{
								mouseover: (e) => {
									const layer = e.target;
									layer.setStyle({
										dashArray: "",
										fillColor: "#0c6748",
										fillOpacity: 0.7,
										weight: 2,
										opacity: 1,
										color: "white",
									})
								},
								mouseout: (e) => {
									const layer = e.target;
									layer.setStyle({
										fillOpacity: 0.7,
										weight: 2,
										dashArray: "3",
										color: 'white',
										fillColor: '#168b46'
									});
								},
								click: (e) => {
									<Tooltip>Tooltip for CircleMarker</Tooltip>
								}
							}}
							key={province.properties.ADM2_EN}
						/>)
					})
				}

				<Marker position={[14.1651, 121.2402]}>
					<Popup>
						Center
					</Popup>
				</Marker>

				{/* <Marker position={[14.2631119, 121.5787233]}>
					<Popup>
						Cavinti Cave
					</Popup>
				</Marker> */}

				{
					caves.map( (cave) => (
						<Marker position={cave.coordinates}>
							<Popup>
								{cave.name}
							</Popup>
						</Marker>
					))
				}

			</MapContainer>
			
		</>
  )
}

export default IsolationMap