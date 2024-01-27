import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Krona = ({strains}) => {
  console.log(strains)
  const [ data, setData ] = useState(strains)
  
  return (
    <>
      <div>Krona</div>
      <div>
        {
          data?.map( (strain) => (
            <h4>{strain?.strain_name}</h4>
          ))
        }
      </div>
    </>
  )
}

export default Krona