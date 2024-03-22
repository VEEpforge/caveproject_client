import { MapContainer, TileLayer, Polygon, Marker, Popup, Tooltip, LayersControl, LayerGroup, ImageOverlay, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { provinces } from '../../constants/4AProvincesGeoJSON'
import { municities } from '../../constants/4AMunicitiesGeoJSON'
import { caves } from '../../constants/caves'
import { useState } from 'react'
import { Control, Icon, divIcon, point } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import Cave from '../../assets/cave.svg'
import { useSelector } from 'react-redux'


function getColor(c) {
	return	c	> 10	? '#006837' :
				 	c > 5  ? '#31a354' :
				 	c > 3  ? '#78c679' :
				 	c > 1   ? '#c2e699' :
										'#ffffcc'	;
}

function PolygonLayer ({strains, handleFilterData, setSelected}) {
	// console.log(strains)
	
	return (
		<>
		{
			provinces.features.map((province) => {
				var coordinates;
				// Polygon
				if(province.geometry.type === 'Polygon') coordinates = province.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = province.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				const strainCount = strains?.filter( (item) => item.city_province?.toLowerCase().includes(province.properties.ADM2_EN.toLowerCase())).length
				
				return (<Polygon
					pathOptions={{
						fillColor: getColor(strainCount),
						// fillColor: '#168b46',
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
								dashArray: '',
								weight: 2,
								opacity: 1,
								color: 'black',
							})
							setSelected(province.properties.ADM2_EN)
						},
						mouseout: (e) => {
							const layer = e.target;
							layer.setStyle({
								weight: 2,
								dashArray: '3',
								color: 'white',
							});
						},
						click: (e) => {
							handleFilterData(strains?.filter( (strain) => {
								return (
									strain.city_province?.toLowerCase().includes(province.properties.ADM2_EN.toLowerCase())
								)
							}))
						}
					}}
					key={province.properties.ADM2_EN}
				/>)
			})
		}
		</>
	)
}

function MuncitiesMapLayer ({ strains, setSelected }) {
	return (
		<>
		{
			municities.features.map((muncity) => {
				var coordinates;
				// Polygon
				if(muncity.geometry.type === 'Polygon') coordinates = muncity.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = muncity.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				const strainCount = strains?.filter( (item) => item.city_province?.toLowerCase().includes(muncity.properties.ADM3_EN.toLowerCase()) && item.city_province?.toLowerCase().includes(muncity.properties.ADM2_EN.toLowerCase())).length
				
				return (<Polygon
					pathOptions={{
						fillColor: getColor(strainCount),
						// fillColor: '#168b46',
						fillOpacity: 0.7,
						weight: 2,
						opacity: 1,
						dashArray: 3,
						color: 'green'
					}}
					positions={coordinates}
					eventHandlers={{
						mouseover: (e) => {
							const layer = e.target;
							layer.setStyle({
								dashArray: '',
								weight: 2,
								opacity: 1,
								color: 'black',
							})
							setSelected(muncity.properties.ADM3_EN)
						},
						mouseout: (e) => {
							const layer = e.target;
							layer.setStyle({
								weight: 2,
								dashArray: '3',
								color: 'green',
							});
						},
						click: (e) => {
							// handleFilterData(strains?.filter( (strain) => {
							// 	return (
							// 		strain.city_province?.toLowerCase().includes(province.properties.ADM2_EN.toLowerCase())
							// 	)
							// }))
						}
					}}
					key={muncity.properties.ADM2_EN}
				/>)
			})
		}
		</>
	)
}

function CaveLayer () {

	const customIcon = new Icon({
		iconUrl: Cave,
		iconSize: [30, 30] // size of the icon
	})

	return (
		<>
		{
			caves.map( (cave) => (
				// <CircleMarker center={cave.coordinates} radius={5} pathOptions={{ color: 'black', fillColor: 'black' }}>
				<Marker position={cave.coordinates} icon={customIcon}>
					<Popup>
						{cave.name}
					</Popup>
				</Marker>
				// </CircleMarker>
			))
		}
		</>
	)
}

function StrainLayer ({strains}) {

	// const clusterCustomIcon = new Icon ({})

	const createClusterCustomIcon = (cluster) => {
		return new divIcon({
			html: `<span class='cluster-icon'>${cluster.getChildCount()}</span>`,
			className: 'cluster-custom-icon',
			iconSize: point(33, 33, true)
		})
	}
	// console.log(strains)
	return (
		<>
			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={createClusterCustomIcon}
				className='text-semibold'
			>
			{
				// strains?.strains.map( (strain) => (
				strains?.map( (strain) => (
					// I add random number so the strain don't overlap with each other
					<CircleMarker
						center={[strain.location_latitude + (Math.random() * (0.00009 - 0.000001) + 0.000001), strain.location_longitude + (Math.random() * (0.00009 - 0.000001) + 0.000001)]}
						radius={1.5}
						pathOptions={{ color: 'yellow', fillColor: 'yellow' }}
					>
						<Popup>
							{strain.strain_name}
						</Popup>
					</CircleMarker>
				))
			}
			</MarkerClusterGroup>
		</>
	)
}

function AdminView ({strains}) {
	return (
		<LayersControl position='topright'>
			<LayersControl.Overlay name='Center'>
				<Marker position={[14.1651, 121.2402]} >
					<Popup>
						Center
					</Popup>
				</Marker>
			</LayersControl.Overlay>
			<LayersControl.Overlay checked name='Heat Map'>
				<LayerGroup>
					{/* <PolygonLayer strains={data} /> */}
				</LayerGroup>	
			</LayersControl.Overlay>
			<LayersControl.Overlay checked name='Cave Position'>
				<LayerGroup>
					<CaveLayer />
				</LayerGroup>
			</LayersControl.Overlay>
			<LayersControl.Overlay name='Strains'>
				<LayerGroup>
					<StrainLayer strains={data} />
				</LayerGroup>
			</LayersControl.Overlay>
		</LayersControl>
	)
}

function Legend ({position}) {
	// const parentMap = useMap()
	return (
		<>
		</>
	)
}

const IsolationMap = ({strains, handleFilterData}) => {
	const { user } = useSelector((state) => state.auth)

	const [ open, setOpen ] = useState(true)
	const toggleOpen = () => setOpen((cur) => !cur)

	// const [ data, setData ] = useState(strains)

	const [ selected, setSelected ] = useState('')

	
  return (
    <div className='h-full w-full'>
			<div className='bg-dimWhite bg-opacity-50 h-20 w-60 absolute top-7 right-40 flex z-50 items-center justify-center'>
				{
					selected ? 
						<>
							<span className='text-base font-semibold text-dimBlack'>{selected}</span>
							<span className='text-base text-dimBlack ml-2'> {strains?.filter( (item) => item.city_province?.toLowerCase().includes(selected.toLowerCase())).length} strains</span>
						</>
					:
					<span className='text-base font-semibold text-dimBlack'>Hover over an area</span>
					// <span className='text-base font-semibold text-dimBlack'>{selected}</span>
				}
			</div>
			{/* <div className='bg-dimWhite bg-opacity-50 rounded-md h-auto w-auto p-4 absolute bottom-9 left-5 flex z-50 items-center justify-center'>
          <div className='block gap-4'>
						<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#006837]' /> <span className='flex-col ml-2 text-base text-dimBlack'>50+</span></div>
						<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#31a354]' /> <span className='flex-col ml-2 text-base text-dimBlack'>21-49</span></div>
						<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#78c679]' /> <span className='flex-col ml-2 text-base text-dimBlack'>11-20</span></div>
						<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#c2e699]' /> <span className='flex-col ml-2 text-base text-dimBlack'>6-10</span></div>
						<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#ffffcc]' /> <span className='flex-col ml-2 text-base text-dimBlack'>less 5</span></div>
					</div>
      </div> */}
			<div className='relative z-10 w-full h-full'>
				<MapContainer center={[14.1651, 121.2402]} zoom={15} zoomControl>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{/* {
						user?.user_level === 'ADMIN' ? (
							<AdminView strains={data} />
						) : (
							<PolygonLayer strains={data} />
						)
					} */}
					<LayersControl position='topright'>
						<LayersControl.Overlay name='Center'>
							<Marker position={[14.1651, 121.2402]} >
								<Popup>
									Center
								</Popup>
							</Marker>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Province Heat Map'>
							<LayerGroup>
								<PolygonLayer strains={strains} handleFilterData={handleFilterData} setSelected={setSelected} />
							</LayerGroup>	
						</LayersControl.Overlay>
						<LayersControl.Overlay checked name='Muncities Heat Map'>
							<LayerGroup>
								<MuncitiesMapLayer strains={strains} setSelected={setSelected} />
							</LayerGroup>	
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Cave Position'>
							<LayerGroup>
								<CaveLayer />
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay checked name='Strains'>
							<LayerGroup>
								<StrainLayer strains={strains} />
							</LayerGroup>
						</LayersControl.Overlay>
					</LayersControl>

					{/* <LayerGroup position='bottomright'>
						<div className='bg-dimWhite bg-opacity-50 rounded-md h-auto w-auto p-4 flex z-50 items-center justify-center'>
							<div className='block gap-4'>
								<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#006837]' /> <span className='flex-col ml-2 text-base text-dimBlack'>50+</span></div>
								<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#31a354]' /> <span className='flex-col ml-2 text-base text-dimBlack'>21-49</span></div>
								<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#78c679]' /> <span className='flex-col ml-2 text-base text-dimBlack'>11-20</span></div>
								<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#c2e699]' /> <span className='flex-col ml-2 text-base text-dimBlack'>6-10</span></div>
								<div className='flex items-center'><div className='flex-col h-7 w-7 bg-[#ffffcc]' /> <span className='flex-col ml-2 text-base text-dimBlack'>less 5</span></div>
							</div>
						</div>
					</LayerGroup> */}

				</MapContainer>
				
			</div>
			
		</div>
  )
}

export default IsolationMap