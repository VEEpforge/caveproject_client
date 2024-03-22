import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteStrain } from '../../features/strain/strainSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DeleteStrain = ({strain}) => {
  const [ open, setOpen ] = useState(false)
	
	const handleDelete = () => setOpen(!open)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <Button onClick={handleDelete} className='flex ml-2 py-1.5 pr-2 pl-1 text-dimWhite bg-red-600 items-center'>
				<TrashIcon className="inline h-4 w-4" />
				<Typography className='inline ml-1 normal-case font-normal text-base'>Delete</Typography>
			</Button>
      <Dialog open={open} handler={handleDelete}>
        <DialogHeader>Delete Strain</DialogHeader>
        <DialogBody>
          Are you sure you wnat to delete {strain.strain_name}?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" className="mr-1 text-base text-dimBlack normal-case" onClick={handleDelete}>
            <span>Cancel</span>
          </Button>
          <Button className='bg-red-600 text-base normal-case'
            onClick={ () => {
              dispatch(deleteStrain(strain._id))
              navigate('/strain-collection')
              toast.success('Successfully deleted strain!')
            } }>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default DeleteStrain