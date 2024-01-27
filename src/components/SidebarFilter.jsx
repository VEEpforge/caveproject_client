import { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Option,
  Input
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { category_1, category_2, category_3 } from '../constants/miso'
import SelectMISO from './SelectMISO'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SidebarFilter = ({strains, handleFilterData}) => {

  const [ data, setData ] = useState(strains)
  const [ species, setSpecies ] = useState('')
  const [ speciesList, setSpeciesList ] = useState([])
  const [ sampling_site, setSamplingSite ] = useState('')
  const [ sample_type, setSampleType ] = useState('')
  const [ city_province, setCityProvince ] = useState('')
  // {handleFilterData(strains)}

  const fetchData = () => {
    // console.log(value)
    let result

    // if(name == 'species') {
      result = data.filter( (item) => {
        return (
          // item.strain_name &&
          item.strain_name?.toLowerCase().includes(species?.toLowerCase()) &&
          // item.sampling_site &&
          item.sampling_site?.toLowerCase().includes(sampling_site?.toLowerCase()) &&
          item.sample_type?.toLowerCase().includes(sample_type?.toLowerCase()) &&
          item.city_province?.toLowerCase().includes(city_province?.toLowerCase())
        )
      })
      // setData(result)
    // }    
    console.log(result)
  }
  
  const handleChange = (name, value) => {
    if (name == 'species') setSpecies(value);
    if (name == 'sampling_site') setSamplingSite(value)
    if (name == 'sample_type') setSampleType(value)
    if (name == 'city_province') setCityProvince(value)
    fetchData();
  };

  const handleCallback = () => {

  }
  
  return (
    <>
      <Card className='my-2 w-screen max-w-md h-screen rounded-none shadow-none border-r-2'>
        <CardBody className='overflow-y-auto'>
          <div className='flex items-center'>
            <Typography variant='h5' color='blue-gray' className='flex-grow justify-start'>
              Filter Occurences
            </Typography>
            <Button variant='outlined' className='justify-end normal-case lg:pr-4 lg:pl-3 lg:py-2.5  border-primary text-primary hover:bg-dimBlack hover:text-dimWhite'>
              <Typography className='font-semibold text-base'>Submit Filter</Typography>
            </Button>
          </div>
            
          <div className='flex flex-col gap-6 px-4 py-6 border-b border-blue-gray-100 mb-6'>
            <Input
              name='species'
              size="lg"
              label="Species"
              value={species}
              className='focus:border-none focus:border-0 text-dimBlack'
              onChange={(e) => handleChange( e.target.name, e.target.value )}
            />
            
            <Input
              name='sampling_site'
              size="lg"
              label="Cave/Sampling site"
              value={sampling_site}
              className='focus:border-none'
              onChange={(e) => handleChange( e.target.name, e.target.value )}
            />

            <Input
              name='sample_type'
              size="lg"
              label="Sample type"
              value={sample_type}
              className='focus:border-none'
              onChange={(e) => handleChange( e.target.name, e.target.value )}
            />

            <Input
              name='city_province'
              size="lg"
              label="City/Province"
              value={city_province}
              className='focus:border-none'
              onChange={(e) => handleChange( e.target.name, e.target.value )}
            />

          </div>
          <div className='flex flex-col gap-6 px-4'>
            <SelectMISO handleCallback={handleCallback} />
          </div>    
        </CardBody>
      </Card>
    </>
  )
}

export default SidebarFilter
