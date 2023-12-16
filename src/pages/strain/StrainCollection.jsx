import { Navbar } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
	ListItemPrefix,
  ListItemSuffix,
  Card,
	Checkbox,
  IconButton,
	Typography,
	Button,
} from '@material-tailwind/react';
import { PencilIcon ,PencilSquareIcon,TrashIcon } from '@heroicons/react/24/outline'
import { getStrainByUser, reset } from '../../features/strain/strainSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { Spinner } from '../../components/index'


const StrainCollection = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector( (state) => state.auth )
	const { strains, loading, error } = useSelector( (state) => state.strain )

	// dispatch(getStrainByUser())

	// useEffect( () => {
	// 	if(error) {
	// 		toast.error(error)
	// 	}

	// 	if(loading) {
	// 		<Spinner />
	// 	}

	// 	// return () => {
	// 	dispatch(reset)
	// 	// }
	// }, [ user, error, loading, dispatch ])

  return (
    <>
			<Navbar />

			<div className='w-full flex justify-center my-4 text-primary'>
				<div className='lg:w-3/4 flex'>
				<Typography variant='h2' className='flex-grow'>
					Strain Collection
				</Typography>
				<Button className='justify-end normal-case font-semibold text-md bg-primary'>
					<Link to='/add-strain'>Add Strain</Link>
				</Button>
				</div>
			</div>
			
			
			
			<div className='w-full h-full flex justify-center'>
				<Card className='w-3/4 bg-transparent'>
					<List className='hover:bg-none'>
						<ListItem ripple={false} className='py-1 pr-1 pl-4'>
							<ListItemPrefix>
								<Checkbox className='text-primary' />
							</ListItemPrefix>
							{/* {strains[0].strain_name} */}Item
							<ListItemSuffix>
								<div className='flex items-center'>
									<Button variant='outlined' className='flex items-center py-1 pr-4 pl-3 text-primary border-primary'>
										<PencilIcon className="inline  h-4 w-4" />
										<Typography className='inline ml-1 normal-case font-normal'>Edit</Typography>
									</Button>
									<Button variant='outlined' className='flex items-center ml-2 py-1 pr-2 pl-1 text-red-300 border-red-300'>
										{/* <div className='flex items-center h-3'> */}
											<TrashIcon className=" inline h-4 w-4" />
											<Typography className='inline ml-1 normal-case font-normal'>Delete</Typography>
										{/* </div> */}
									</Button>
								</div>
							</ListItemSuffix>
						</ListItem>
						<ListItem ripple={false} className='py-1 pr-1 pl-4'>
							Item Two
							<ListItemSuffix>
								<IconButton variant='text' color='blue-gray'>
									<TrashIcon className="block h-6 w-6" />
								</IconButton>
							</ListItemSuffix>
						</ListItem>
						<ListItem ripple={false} className='py-1 pr-1 pl-4'>
							Item Three
							<ListItemSuffix>
								<IconButton variant='text' color='blue-gray'>
									<TrashIcon className="block h-6 w-6" />
								</IconButton>
							</ListItemSuffix>
						</ListItem>
					</List>
				</Card>
			</div>
			<div className='w-screen h-screen bg-primary'></div>
    </>
  )
}

export default StrainCollection