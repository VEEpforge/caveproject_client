import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addStrain,reset } from '../features/strain/strainSlice'
import { Spinner, SelectMISO } from '../components/index'
import { toast } from 'react-toastify'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const StrainForm = () => {
	const { strains, loading, error } = useSelector( (state) => state.strain )

	const [ data, setData ] = useState({
		strain_name: '',
		scientific_name: '',
		domain: '',
		phylum: '',
		class_name: '',
		order: '',
		family: '',
		genus: '',
		species: '',
		sampling_site: '',
		sampling_point: '',
		host_type: '',
		host_species: '',
		sample_type: '',
		isolate_id: '',
		city_province: '',
		location_abbr: '',
		location_latitude: 0,
		location_longitude: 0,
		// miso_categories: [],
		location_information: '',
	})

	const {
		strain_name,
		scientific_name,
		domain,
		phylum,
		class_name,
		order,
		family,
		genus,
		species,
		sampling_site,
		sampling_point,
		host_type,
		host_species,
		sample_type,
		isolate_id,
		city_province,
		location_abbr,
		location_latitude,
		location_longitude,
		// miso_categories,
		location_information,
	} = data

	const [miso_categories, setMISOCategories] = useState([])

	const handleCallback = (childData) => {
		setMISOCategories(childData)
	}
	console.log(miso_categories)

	const navigate = useNavigate()
  const dispatch = useDispatch()

	useEffect(() => {
		if (loading) {
	  <Spinner />
	}
	if (error) {
	  toast.error(error)
	}
	if (strains != [] & strains.length > 0) {
	  setData({})
			document.getElementById('strainForm').reset()
	  toast.success('Successfully added strain!')
			navigate('/add-strain')
	}
		
		dispatch(reset())
  }, [ loading, error, strains, navigate, dispatch ])

	const onChange = (e) => {
	setData((prevState) => ({
	  ...prevState,
	  [e.target.name]: e.target.value,
	}))
  }

	const onSubmit = async (e) => {
	e.preventDefault()

		const strainData = {
			strain_name,
			scientific_name,
			domain,
			phylum,
			class_name,
			order,
			family,
			genus,
			species,
			sampling_site,
			sampling_point,
			host_type,
			host_species,
			sample_type,
			isolate_id,
			city_province,
			location_abbr,
			location_latitude,
			location_longitude,
			miso_categories,
		}

		dispatch(addStrain(strainData))
	}

  return (
	<form id='strainForm' onSubmit={onSubmit}>
			<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary'>
		Add Strain
	  </h2>

	  <div className='space-y-12'>
		<div className='border-b border-gray-900/10 pb-10'>

		  <div className='space-y-12 bg-dimBlack justify-center items-center '>
			<h4 className='mt-10 font-bold  text-dimWhite px-2 py-2'>
			  Name and Taxonomic Classification
			</h4>
		  </div>

					<div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6'>

						<div className='col-span-full'>
							<label htmlFor='strain_name' className='block text-sm font-medium leading-6 text-dimBlack'>
								Strain name
							</label>
								<input
									type='text'
									name='strain_name'
									id='strain_name'
									value={strain_name}
									onChange={onChange}
									required
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='col-span-full mt-1'>
							<label htmlFor='scientific_name' className='block text-sm font-medium leading-6 text-dimBlack'>
								Scientific name
							</label>
								<input
									type='text'
									name='scientific_name'
									id='scientific_name'
									value={scientific_name}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='domain' className='block text-sm font-medium leading-6 text-dimBlack'>
								Domain
							</label>
								<input
									type='text'
									name='domain'
									id='domain'
									value={domain}
									onChange={onChange}
									onClick={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='phylum' className='block text-sm font-medium leading-6 text-dimBlack'>
								Phylum
							</label>
								<input
									type='text'
									name='phylum'
									id='phylum'
									value={phylum}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='class_name' className='block text-sm font-medium leading-6 text-dimBlack'>
								Class
							</label>
								<input
									type='text'
									name='class_name'
									id='class_name'
									value={class_name}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='order' className='block text-sm font-medium leading-6 text-dimBlack'>
								Order
							</label>
								<input
									type='text'
									name='order'
									id='order'
									value={order}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='family' className='block text-sm font-medium leading-6 text-dimBlack'>
								Family
							</label>
								<input
									type='text'
									name='family'
									id='family'
									value={family}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='genus' className='block text-sm font-medium leading-6 text-dimBlack'>
								Genus
							</label>
								<input
									type='text'
									name='genus'
									id='genus'
									value={genus}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='species' className='block text-sm font-medium leading-6 text-dimBlack'>
								Species
							</label>
								<input
									type='text'
									name='species'
									id='species'
									value={species}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>
		  </div>
		</div>

		<div className='border-b border-gray-900/10 pb-10'>
		  <div className='space-y-12 bg-dimBlack justify-center items-center '>
			<h4 className='mt-10 font-bold  text-dimWhite px-2 py-2'>
			  Isolation, sampling, and environmental information
			</h4>
		  </div>

		  <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6'>
			
			<div className='sm:col-span-3 sm:col-start-1'>
							<label htmlFor='sampling_site' className='block text-sm font-medium leading-6 text-dimBlack'>
								Cave/Sampling site
							</label>
								<input
									type='text'
									name='sampling_site'
									id='sampling_site'
									value={sampling_site}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='sampling_point' className='block text-sm font-medium leading-6 text-dimBlack'>
								Sampling point
							</label>
								<input
									type='text'
									name='sampling_point'
									id='sampling_point'
									value={sampling_point}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3 sm:col-start-1'>
							<label htmlFor='host_type' className='block text-sm font-medium leading-6 text-dimBlack'>
								Host type
							</label>
								<input
									type='text'
									name='host_type'
									id='host_type'
									value={host_type}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='host_species' className='block text-sm font-medium leading-6 text-dimBlack'>
								Host species
							</label>
								<input
									type='text'
									name='host_species'
									id='host_species'
									value={host_species}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3 sm:col-start-1'>
							<label htmlFor='sample_type' className='block text-sm font-medium leading-6 text-dimBlack'>
								Sample type
							</label>
								<input
									type='text'
									name='sample_type'
									id='sample_type'
									value={sample_type}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3 sm:col-start'>
							<label htmlFor='isolate_id' className='block text-sm font-medium leading-6 text-dimBlack'>
								Isolate id
							</label>
								<input
									type='text'
									name='isolate_id'
									id='isolate_id'
									value={isolate_id}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

			<div className='sm:col-span-3 sm:col-start-1'>
							<label htmlFor='city_province' className='block text-sm font-medium leading-6 text-dimBlack'>
								City/Province
							</label>
								<input
									type='text'
									name='city_province'
									id='city_province'
									value={city_province}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<div className='sm:col-span-3'>
							<label htmlFor='location_abbr' className='block text-sm font-medium leading-6 text-dimBlack'>
								Location abbreviation
							</label>
								<input
									type='text'
									name='location_abbr'
									id='location_abbr'
									value={location_abbr}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

			<div className='sm:col-span-3 sm:col-start-1'>
							<label htmlFor='location_latitude' className='block text-sm font-medium leading-6 text-dimBlack'>
								Location latitude
							</label>
								<input
									type='number'
									name='location_latitude'
									id='location_latitude'
									value={location_latitude}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

			<div className='sm:col-span-3'>
							<label htmlFor='location_longitude' className='block text-sm font-medium leading-6 text-dimBlack'>
								Location longitude
							</label>
								<input
									type='number'
									name='location_longitude'
									id='location_longitude'
									value={location_longitude}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>

						<label className='sm:col-span-full text-sm font-medium leading-6 text-dimBlack'>
							MISO categories
						</label>

						<SelectMISO childToParent={handleCallback} />

						<div className='col-span-full'>
							<label htmlFor='location_information' className='block text-sm font-medium leading-6 text-dimBlack'>
								Location information
							</label>
								<input
									type='text'
									name='location_information'
									id='location_information'
									value={location_information}
									onChange={onChange}
									className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
						</div>
						
		  </div>
		</div>
	  </div>

	  <div className='mt-6 mb-6 flex items-center justify-end gap-x-6'>
		<button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
		  Cancel
		</button>
		<button
		  type='submit'
		  className='rounded-md bg-primary lg:px-6 lg:h-10 sm:h-5 sm:px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dimBlack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
		>
		  Add Strain
		</button>
	  </div>
	</form>
  )
}

export default StrainForm