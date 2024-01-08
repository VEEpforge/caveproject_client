import { useSelector } from 'react-redux'
import { ChevronUpDownIcon, PencilIcon } from '@heroicons/react/20/solid'
import { Card, CardBody, Typography, Chip, Tooltip, IconButton } from '@material-tailwind/react'
import { category_1 } from '../../constants/miso'


const tableHead = ['Species', 'Sampling Site', 'Sample Type', 'Location', 'Level 1', 'Level 2', 'Level 3', '' ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IsolationTable = (strains) => {
  // const { strains } = useSelector( (state) => state.strain )
  // {console.log(strains)}
  // {console.log('Type: ' + typeof(strains[0]))}

  return (
    <Card className='w-full h-full '>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-full table-auto text-left'>
          <thead>
            <tr>
            {
              tableHead.map( (head, index) => (
                <th
                  key={head}
                  className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                >
                  <Typography variant='small' className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'>
                    {head}{' '}
                      {index < tableHead.length - 4 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))
            }
            </tr>
          </thead>
          <tbody>
          {
             strains.strains[0]?.map((strain) => (
                <tr className='border-b border-blue-gray-100'>
                  <td>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-sm font-normal leading-4 p-4"
                      // className="text-sm font-normal"
                    >
                      {strain.strain_name}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal p-4"
                    >
                      {strain.sampling_site ? strain.sampling_site : ''}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal p-4"
                    >
                      {strain.sample_type? strain.sample_type: null}
                    </Typography>
                  </td>
                  <td>
                    <div className="flex flex-col p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex-col-1"
                    >
                      {strain.city_province}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {strain.location_latitude.toFixed(4)}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {strain.location_longitude.toFixed(4)}
                    </Typography>
                    </div>
                  </td>
                  <td>
                    <div className='w-max'>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={strain.miso_categories[0]? strain.miso_categories[0] : null}
                        color='green'
                      />
                    </div>                   
                  </td>
                  <td>
                    <div className='w-max'>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={strain.miso_categories[1]? strain.miso_categories[1] : null}
                        color='green'
                      />
                    </div>                   
                  </td>
                  <td>
                    <div className='w-max'>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={strain.miso_categories[2]? strain.miso_categories[2] : null}
                        color='green'
                      />
                    </div>                   
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default IsolationTable