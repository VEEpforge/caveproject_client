// Contains functions <SelectMISO> and <UpdateStrainForm>
// Main function <UpdateStrain>

import { PencilIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DialogBody, DialogHeader, Option, Select, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { updateStrain, reset } from '../../features/strain/strainSlice'
import { category_1,category_2, category_3 } from '../../constants/miso'
import { Spinner } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function SelectMISO ({handleCallback, misoCategories}) {
	// const [miso, setMISO] = useState([])
	const [c1, setC1] = useState(misoCategories[0])
	const [c2, setC2] = useState(misoCategories[1])
	const [c3, setC3] = useState(misoCategories[2])
	const [c2List, setC2List] = useState(category_2)
	const [c3List, setC3List] = useState(category_3)

	const handleCat1Change = async (e) => {
		setC1(e)
		setC2('')
		setC3('')
		handleCallback([e,c2,c3])
		const c1_code = category_1.find((item) => {return item.name === e }).cat1_code
		setC2List(category_2.filter((item) => {return item.cat1_code === c1_code }))
		setC3List(category_3.filter((item) => {return item.cat1_code === c1_code }))
	}

	const handleCat2Change = async (e) => {
		setC2(e)
		setC3('')
		{handleCallback([c1,e,c3])}

		const c1_code = category_1.find((item) => {return item.name === c1 }).cat1_code
		const c2_code = category_2.find((item) => {return item.name === e && item.cat1_code === c1_code }).cat2_code
		setC3List(category_3.filter((item) => {return item.cat2_code === c2_code }))
	}
	const handleCat3Change = async (e) => {
		setC3(e)
		{handleCallback([c1,c2,e])}
	}

	const category1 = category_1.map( (item) => (
		<Option key={item.name} value={item.name} className={`${item.color_code} text-dimBlack`} > {item.name} </Option>
	))

	const category2 = c2List.sort(function (a, b) {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	}).map( (item) => (
		<Option key={item.name+item.cat2_code} value={item.name} className={`${item.color_code} text-dimBlack`} > {item.name} </Option>
	))

	const category3 = c3List.sort(function (a, b) {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	}).map( (item) => (
		<Option key={item.name+item.cat2_code} value={item.name} className={`${item.color_code} text-dimBlack`} > {item.name} </Option>
	))

	// const onCLick = async (e) => {
	// 	miso.push([c1,c2,c3])
	// }
  return (
		<>
			<div className='col-span-2 sm:col-start-1 mt-1 '>
				<Select label='Category 1' value={c1} onChange={handleCat1Change} className=' sm:max-w-xs'>
					{category1}
				</Select>
				{(c1 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c1}</span> is selected</p> : null}
			</div>

			<div className='col-span-2 mt-1 '>
				<Select label='Category 2' value={c2} onChange={handleCat2Change} className=' sm:max-w-xs'>
					{category2}
				</Select>
				{(c2 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c2}</span> is selected</p> : null}
			</div>

			<div className='col-span-2 mt-1 '>
				<Select label='Category 3' value={c3} onChange={handleCat3Change} className=' sm:max-w-xs'>
					{category3}
				</Select>
				{(c3 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c3}</span> is selected</p> : null}
			</div>

			{/* <Button className='normal-case' onClick={onCLick}>Add Another Category</Button> */}
		</>
  )
}

function UpdateStrainForm ({strain, handleUpdate}) {
  const { strains, loading, error, success } = useSelector( (state) => state.strain )

  const [ data, setData ] = useState({
		strain_name: strain.strain_name,
		scientific_name: strain.scientific_name,
		domain: strain.domain,
		phylum: strain.phylum,
		class_name: strain.class_name,
		order: strain.order,
		family: strain.family,
		genus: strain.genus,
		species: strain.species,
		sampling_site: strain.sampling_site,
		sampling_point: strain.sampling_point,
		host_type: strain.host_type,
		host_species: strain.host_species,
		sample_type: strain.sample_type,
		isolate_id: strain.isolate_id,
		city_province: strain.city_province,
		location_abbr: strain.location_abbr,
		location_latitude: strain.location_latitude,
		location_longitude: strain.location_longitude,
		// miso_categories: [],
		location_information: strain.location_information,
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

  const [miso_categories, setMISOCategories] = useState(strain.miso_categories)

  const navigate = useNavigate()
  const dispatch = useDispatch()

	const handleCallback = (misoData) => {
		setMISOCategories(misoData)
	}

  useEffect(() => {
		if (loading) {
      <Spinner />
    }
    if (error) {
      toast.error(error)
    }

    if (success) {
      toast.success('Successfully updated strain!')
      // navigate('/strain-collection')
    }

    // dispatch(reset())
  }, [ loading, error, success, strains ])

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
      location_information
		}
    // console.log('Strain _id: ' + strain._id)

		dispatch(updateStrain([strainData, strain._id]))
    // navigate('/strain-collection')
	}

  return (
    <>
      <form id='strainForm' onSubmit={onSubmit}>
        <div className='space-y-12 mx-4'>
          <div className='border-b border-gray-900/10 pb-10'>

            <div className=' bg-dimBlack justify-center items-center '>
              <h4 className='font-bold  text-dimWhite px-2 py-2'>
                Name and Taxonomic Classification
              </h4>
            </div>

            <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6'>

              <div className='col-span-full'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Strain name
                </label>
                <input
                  type='text'
                  name='strain_name'
                  id='strain_name'
                  value={strain_name}
                  onChange={onChange}
                  onClick={onChange}
                  required
                  className='block w-full rounded-md border-0 py-2 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-base sm:text-sm sm:leading-6 h-10'
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
                    onClick={onChange}
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
                    onClick={onChange}
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
                    onClick={onChange}
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
                    onClick={onChange}
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
                    onClick={onChange}
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
                    onClick={onChange}
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
                    onClick={onChange}
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

              <SelectMISO handleCallback={handleCallback} misoCategories={strain.miso_categories} />

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
          <Button variant="text" className="mr-1 text-base text-dimBlack normal-case" onClick={handleUpdate}>
            <span>Cancel</span>
          </Button>
          <Button className='bg-primary text-base normal-case'
            onClick={onSubmit} >
            <span>Update</span>
          </Button>
        </div>
      </form>
    </>
  )
}


const UpdateStrain = ({strain}) => {

  const [ open, setOpen ] = useState(false)
	const handleUpdate = () => setOpen(!open)

  return (
    <>
      <Button onClick={handleUpdate} className='py-1.5 pr-4 pl-3 text-dimWhite bg-green-500 items-center' >
        <PencilIcon className="inline  h-4 w-4" />
        <Typography className='inline ml-1 normal-case font-normal text-base'>Edit</Typography>
      </Button>
      <Dialog open={open} handler={handleUpdate} size='xl' className='h-3/4 overflow-scroll'>
        <DialogHeader>
          <Typography
            variant='h3'
            className='font-bold'
          >
            Update Strain
          </Typography>
          </DialogHeader>
        <DialogBody>
          <UpdateStrainForm strain={strain} handleUpdate={handleUpdate} />
          
        </DialogBody>
        {/* <DialogFooter>
        </DialogFooter> */}
      </Dialog>
    </>
  )
}

export default UpdateStrain