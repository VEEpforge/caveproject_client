import React, { useEffect } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'
import data from '../../../backup/data.json'
import miso from '../../../backup/misoJSON.json'

var template = {
	"name": "",
	"color": "",
	"children":[]
}

// function generateMisoData (strains) {
//   const misoData = miso
//   var arr = []

//   strains.map( (item) => {
//     if (item.miso_categories.length != 0) arr.push(item.miso_categories)
//   })

//   console.log(arr)
//   console.log(misoData.children[0].name)

//   return null
// }

const Metrics = ({strains}) => {
  // console.log(strains)

  // useEffect(() => {
  //  generateMisoData(strains)
  //  console.log(strains)
  // },[])

  return (
    <div className='h-screen w-full bg-gray-300'>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={4}
        borderWidth={8}
        borderColor={{ theme: 'background' }}
        colors={{ scheme: 'nivo' }}
        childColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.1
                ]
            ]
        }}
        enableArcLabels={true}
        arcLabel="id"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.4
                ]
            ]
        }}
      />
		</div>
  )
}

export default Metrics