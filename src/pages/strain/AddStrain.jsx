// Contains functions <SelectMISO> and <AddStrainForm>
// Main function <AddStrain>

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addStrain, reset } from '../../features/strain/strainSlice'
import { category_1,category_2, category_3 } from '../../constants/miso'
import { Spinner } from '../../components'
import { Button, Dialog, DialogBody, DialogHeader, Option, Select, Typography } from '@material-tailwind/react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'

function SelectMISO ({handleCallback}) {
	const [c1, setC1] = useState('')
	const [c2, setC2] = useState('')
	const [c3, setC3] = useState('')
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
		handleCallback([c1,e,c3])

		const c1_code = category_1.find((item) => {return item.name === c1 }).cat1_code
		const c2_code = category_2.find((item) => {return item.name === e && item.cat1_code === c1_code }).cat2_code
		setC3List(category_3.filter((item) => {return item.cat2_code === c2_code }))
	}
	const handleCat3Change = async (e) => {
		setC3(e)
		handleCallback([c1,c2,e])
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

	
  return (
		<>
			<div className='col-span-2 sm:col-start-1 mt-1 '>
				<Select label='Category 1' value={c1} onChange={handleCat1Change} className='w-full'>
					{category1}
				</Select>
				{(c1 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c1}</span> is selected</p> : null}
			</div>

			<div className='col-span-2 mt-1 '>
				<Select label='Category 2' value={c2} onChange={handleCat2Change} className='w-full'>
					{category2}
				</Select>
				{(c2 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c2}</span> is selected</p> : null}
			</div>

			<div className='col-span-2 mt-1 '>
				<Select label='Category 3' value={c3} onChange={handleCat3Change} className='w-full'>
					{category3}
				</Select>
				{(c3 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c3}</span> is selected</p> : null}
			</div>
		</>
  )
}

function AddStrainForm ({handleAdd}) {
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
		location_information,
	} = data

  // Handle changes in MISO categories
	const [miso_categories, setMISOCategories] = useState([])
	const handleCallback = (misoData) => {
		setMISOCategories(misoData)
	}

	const navigate = useNavigate()
  const dispatch = useDispatch()

	useEffect(() => {
		if (loading) {
	    <Spinner />
	  }

	  if (error) {
	    toast.error(error)
	  }

    // if (strains != [] & strains.length > 0) {
    //   setData({})
    //   document.getElementById('strainForm').reset()
    //   toast.success('Successfully added strain!')
    //   navigate('/strain-collection')
    // }
		
		// dispatch(reset())
  }, [ loading, error, strains ])

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

		dispatch(addStrain(strainData))

    if(!error & !loading) toast.success('Successfully added strain!')
	}

  return (
    <>
      <form id='strainForm' onSubmit={onSubmit}>
        <div className='space-y-12'>

          <div className='border-b border-gray-900/10 pb-10'>

            <div className='space-y-12 bg-dimBlack justify-center items-center '>
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
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='col-span-full mt-1'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
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
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Cave/Sampling site
                </label>
                <input
                  type='text'
                  name='sampling_site'
                  id='sampling_site'
                  value={sampling_site}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Sampling point
                </label>
                <input
                  type='text'
                  name='sampling_point'
                  id='sampling_point'
                  value={sampling_point}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3 sm:col-start-1'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Host type
                </label>
                <input
                  type='text'
                  name='host_type'
                  id='host_type'
                  value={host_type}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Host species
                </label>
                <input
                  type='text'
                  name='host_species'
                  id='host_species'
                  alue={host_species}
                  onChange={onChange}
                  onClick={onChange}
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
                  onClick={onChange}
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
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3 sm:col-start-1'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  City/Province
                </label>
                <input
                  type='text'
                  name='city_province'
                  id='city_province'
                  value={city_province}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Location abbreviation
                </label>
                <input
                  type='text'
                  name='location_abbr'
                  id='location_abbr'
                  value={location_abbr}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3 sm:col-start-1'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Location latitude
                </label>
                <input
                  type='number'
                  name='location_latitude'
                  id='location_latitude'
                  value={location_latitude}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <div className='sm:col-span-3'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Location longitude
                </label>
                <input
                  type='number'
                  name='location_longitude'
                  id='location_longitude'
                  value={location_longitude}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>

              <label className='sm:col-span-full text-sm font-medium leading-6 text-dimBlack'>
                MISO categories
              </label>
              <SelectMISO handleCallback={handleCallback} />

              <div className='col-span-full'>
                <label className='block text-sm font-medium leading-6 text-dimBlack'>
                  Location information
                </label>
                <input
                  type='text'
                  name='location_information'
                  id='location_information'
                  value={location_information}
                  onChange={onChange}
                  onClick={onChange}
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
                
            </div>
          </div>

        </div> 
        <div className='mt-6 mb-6 flex items-center justify-end gap-x-6'>
          <Button variant='text' onClick={handleAdd} className='mr-1 text-base text-dimBlack normal-case'>
            Cancel
          </Button>
          <Button onClick={onSubmit} className='bg-primary text-base normal-case' >
            Add Strain
          </Button>
        </div>
      </form>
    </>
  )
}



const AddStrain = () => {
  const [ open, setOpen ] = useState(false)
	const handleAdd = () => setOpen(!open)

  return (
    <>
      <Button onClick={handleAdd} className='justify-end normal-case lg:pr-4 lg:pl-3 lg:py-2.5 bg-primary text-dimWhite hover:bg-dimBlack'>
				<PlusIcon className='mr-1 inline h-6 items-center pb-1'/>
				<Typography className='inline font-semibold text-base'>Add Strain</Typography>
		  </Button>

      <Dialog open={open} handler={handleAdd} size='xl' className='h-3/4 overflow-scroll'>
        <DialogHeader>
          <Typography
            variant='h3'
            className='font-bold'
          >
            Add Strain
          </Typography>
          </DialogHeader>
        <DialogBody>
          <AddStrainForm handleAdd={handleAdd} />
        </DialogBody>
      </Dialog>
    </>
  )
}

export default AddStrain