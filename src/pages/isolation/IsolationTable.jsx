import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react'


const tableHead = ['Species', 'Sampling Site', 'Sample Type', 'Location', 'Category 1', 'Category 2', 'Category 3', '' ]

const IsolationTable = () => {
  return (
    <Card className='w-full h-full'>
      <CardBody className='overflow-scroll px-0'>
        <table className='mt-2 w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
            {
              tableHead.map( (head, index) => {
                <th
                  key={head}
                  className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                >
                  <Typography variant='small' className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'>
                    {head}{' '}
                      {index !== tableHead.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              })
            }
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default IsolationTable