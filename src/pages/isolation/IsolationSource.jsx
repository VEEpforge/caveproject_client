import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../../components'
import styles from '../../style'

const IsolationSource = () => {
  const [open, setOpen] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  const activeMenu = false

  return (
    <>
    
		
      <header className=''>
        <div className={`${styles.boxWidth} focus:scroll-auto`}>
          <Navbar />
        </div>
      </header>
			<div className='w-full h-screen bg-slate-50 opacity-20'>
				<div className='absolute w-screen max-w-md h-screen bg-green-500'></div>
				<div></div>
      {/* <div className={`${styles.flexCenter} ${styles.boxWidth}`}>
      { activeMenu ? (
        <div className='w-3/4 block  bg-gray-200 ring-2 ring-inset ring-primary border-1 px-2 py-2 mt-2'>
          Filter Bar
        </div>
      ) : (
        <div> */}
         
        {/* </div>
      )} 
      </div> */}

    </div>
		<div className='w-screen h-screen bg-slate-100'></div>
		</>
  )
}

export default IsolationSource