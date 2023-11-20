import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../../components'
import styles from '../../style'

const IsolationSource = () => {
  const [open, setOpen] = useState(true)
  const activeMenu = true

  return (

    <div className='w-full overflow-hidden'>

      <div className={` ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`${styles.flexCenter} ${styles.boxWidth}`}>
      { activeMenu ? (
        <div className='w-3/4 block  bg-gray-200 ring-2 ring-inset ring-primary border-1 px-2 py-2 mt-2'>
          Filter Bar
        </div>
      ) : (
        <div>
          Sidebar Close
        </div>
      )} 
      </div>

    </div>
  )
}

export default IsolationSource