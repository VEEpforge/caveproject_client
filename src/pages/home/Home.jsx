import React from 'react'
import { Navbar } from '../../components'
import styles from '../../style'

const Home = () => {
  return (
    <div className='w-full overflow-hidden'>

      <div className={` ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          Stats
          Business / Who... / What is...
          Footer
        </div>
      </div> */}

    </div>
  )
}

export default Home