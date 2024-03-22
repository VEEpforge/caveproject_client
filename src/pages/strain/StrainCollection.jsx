import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../components'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
	ListItemPrefix,
  ListItemSuffix,
  Card,
	Checkbox,
	Typography,
	Button,
} from '@material-tailwind/react';
import { PencilIcon ,PencilSquareIcon,TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { getStrainByUser, reset } from '../../features/strain/strainSlice';
import { toast } from 'react-toastify'
import { Spinner } from '../../components/index'
import AddStrain from './AddStrain';
import DeleteStrain from './DeleteStrain';
import UpdateStrain from './UpdateStrain';


function StrainCollectionList ({strains}) {
	const data = strains

  return (
    <div>
			<div className='w-full h-full flex justify-center'>
				<Card className='w-3/4 bg-transparent'>
					<List className='hover:bg-none divide-y'>
						{
							data?.map( (strain) => (
								<ListItem ripple={false} className='py-1 pr-1 pl-4' key={strain.strain_name}>
									<ListItemPrefix>
										<Checkbox className='text-primary' />
									</ListItemPrefix>
										{strain.strain_name}
									<ListItemSuffix>
										<div className='flex items-center'>
											<UpdateStrain strain={strain} />
											<DeleteStrain strain={strain} />
										</div>
									</ListItemSuffix>
								</ListItem>
							))
						}
					</List>
				</Card>
			</div>
    </div>
  )
}

const StrainCollection = () => {
	const { strains, loading, error } = useSelector( (state) => state.strain )
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getStrainByUser())
	
		return () => {
			dispatch(reset())
			dispatch(getStrainByUser())
		}
	}, [dispatch])
	


	useEffect( () => {
		if(error) {
			toast.error(error)
		}

		if(loading) {
			<Spinner />
		}

		// dispatch(getStrainByUser())
		
		// return () => {
    //   dispatch(reset())
    // }
	}, [ error ])

	if (loading) {
    return <Spinner />
  }

	// console.log(strains)

  return (
    <>
			<Navbar />

			<div className='w-full flex justify-center my-4 mt-28'>
				<div className='lg:w-3/4 flex'>
					<Typography variant='h2' className='flex-grow justify-start text-dimBlack'>
						Strain Collection
					</Typography>
					<AddStrain />
				</div>
			</div>
			<StrainCollectionList strains={strains} />
			
    </>
  )
}

export default StrainCollection