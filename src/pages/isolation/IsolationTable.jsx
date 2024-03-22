import { useSelector } from 'react-redux'
import { ChevronUpDownIcon, PencilIcon } from '@heroicons/react/20/solid'
import { Card, CardBody, Typography, Chip, Tooltip, IconButton, CardFooter, Button } from '@material-tailwind/react'
import { category_1 } from '../../constants/miso'
import { useEffect, useState } from 'react'


const tableHead = ['Species', 'Sampling Site | Point', 'Location', 'Sample Type', 'Level 1', 'Level 2', 'Level 3', '' ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IsolationTable = ({strains}) => {
  // console.log(strains)
  // const [ data, setData ] = useState(strains.strains)
  // const [ data, setData ] = useState(strains)
  const data = strains

  return (
    <Card className=''>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-full table-auto text-left'>
          <thead>
            <tr>
            {
              tableHead.map( (head, index) => (
                <th
                  key={head}
                  // className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                  className='border-y border-blue-gray-100 bg-dimBlack p-4'
                >
                  <Typography className='flex items-center justify-between text-dimWhite gap-2 font-medium leading-5'>
                    {head}{' '}
                      {index < tableHead.length - 4 && (
                      <ChevronUpDownIcon strokeWidth={2} className='h-4 w-4' />
                    )}
                  </Typography>
                </th>
              ))
            }
            </tr>
          </thead>
          <tbody>
          {
              data?.map((strain) => (
                <tr className='border-b border-blue-gray-100'>
                  <td>
                    <Typography
                      color='blue-gray'
                      className='text-base font-normal p-4'
                      // className='text-sm font-normal'
                    >
                      {strain.strain_name}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      color='blue-gray'
                      className='text-base font-normal p-4'
                    >
                      {strain.sampling_site ? strain.sampling_site : ''}
                      {/* <span> | </span> */}
                      {strain.sampling_point ? ' | ' + strain.sampling_point : ''}
                    </Typography>
                  </td>
                  <td>
                    <div className='flex flex-col p-4 text-base font-normal'>
                    <Typography
                      color='blue-gray'
                      className='font-normal flex-col-1'
                    >
                      {strain.city_province}
                    </Typography>
                    <Typography
                      color='blue-gray'
                      className='font-normal'
                    >
                      [{strain.location_latitude?.toFixed(4)},{strain.location_longitude?.toFixed(4)}]
                    </Typography>
                    {/* <Typography
                      color='blue-gray'
                      className='font-normal'
                    >
                      {strain.location_longitude}<span>]</span>
                    </Typography> */}
                    </div>
                  </td>
                  <td>
                    <Typography
                      color='blue-gray'
                      className='text-base font-normal p-4'
                    >
                      {strain.sample_type? strain.sample_type: null}
                    </Typography>
                  </td>
                  <td>
                    <div className='w-max'>
                      <Chip
                        variant='ghost'
                        size='sm'
                        value={strain.miso_categories[0]? strain.miso_categories[0] : null}
                        // color='green'
                        className={classNames( strain.miso_categories[0] ? (category_1.find((item) => {return item.name === strain.miso_categories[0] }).color_code) : null, 'text-dimBlack p-2') }
                      />
                    </div>                   
                  </td>
                  <td>
                    <div className='w-max'>
                      <Chip
                        variant='ghost'
                        size='sm'
                        value={strain.miso_categories[1]? strain.miso_categories[1] : null}
                        // color='green'
                        className={classNames( strain.miso_categories[0] ? (category_1.find((item) => {return item.name === strain.miso_categories[0] }).color_code) : null, 'text-dimBlack p-2') }
                      />
                    </div>                   
                  </td>
                  <td>
                    <div className='w-max'>
                      <Chip
                        variant='ghost'
                        size='sm'
                        value={strain.miso_categories[2]? strain.miso_categories[2] : null}
                        // color='green'
                        className={classNames( strain.miso_categories[0] ? (category_1.find((item) => {return item.name === strain.miso_categories[0] }).color_code) : null, 'text-dimBlack p-2') }
                      />
                    </div>                   
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 1
        </Typography>
        <div className='flex gap-2'>
          <Button size='sm' className='normal-case font-semibold text-base bg-transparent border-2 border-dimBlack hover:bg-dimBlack text-dimBlack hover:text-dimWhite'>
            Previous
          </Button>
          <Button size='sm' className='normal-case font-semibold text-base bg-transparent border-2 border-dimBlack hover:bg-dimBlack text-dimBlack hover:text-dimWhite'>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default IsolationTable