import React from 'react'
import { Navbar, StrainForm } from '../../components'
import styles from '../../style'

const AddStrain = () => {
  return (
    <div className='w-full overflow-hidden'>

      <div className={` ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-transparent ${styles.flexStart}`}>
        <div>
          <StrainForm />
        </div>
      </div>

    </div>
  )
}

export default AddStrain