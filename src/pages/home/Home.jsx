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

      <div className='flex h-screen justify-center items-center'>
        <div className=" px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-yellow-300 sm:text-6xl">
            Cave Microbial Culture Collection Information System
          </h1>
          <p className="mt-6 text-lg leading-8 text-dimBlack">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
            Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
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