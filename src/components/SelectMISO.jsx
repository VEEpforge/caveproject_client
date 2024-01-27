import { Select, Option, Button } from "@material-tailwind/react"
import { category_1,category_2, category_3 } from "../constants/miso"
import { useState, React } from "react"

const SelectMISO = ({handleCallback}) => {
	const [miso, setMISO] = useState([])
	const [c1, setC1] = useState('')
	const [c2, setC2] = useState('')
	const [c3, setC3] = useState('')
	const [c2List, setC2List] = useState(category_2)
	const [c3List, setC3List] = useState(category_3)



	const handleCat1Change = async (e) => {
		setC1(e)
		setC2('')
		setC3('')
		handleCallback([e,c2,c3])
		const c1_code = category_1.find((item) => {return item.name === e }).cat1_code
		setC2List(category_2.filter((item) => {return item.cat1_code === c1_code }))
		setC3List(category_3.filter((item) => {return item.cat1_code === c1_code }))
	}

	const handleCat2Change = async (e) => {
		setC2(e)
		setC3('')
		handleCallback([c1,e,c3])

		const c1_code = category_1.find((item) => {return item.name === c1 }).cat1_code
		const c2_code = category_2.find((item) => {return item.name === e && item.cat1_code === c1_code }).cat2_code
		setC3List(category_3.filter((item) => {return item.cat2_code === c2_code }))
	}
	const handleCat3Change = async (e) => {
		setC3(e)
		handleCallback([c1,c2,e])
	}

	const category1 = category_1.map( (item) => (
		<Option key={item.name} value={item.name} className={`${item.color_code} text-dimBlack`} > {item.name} </Option>
	))

	const category2 = c2List.sort(function (a, b) {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	}).map( (item) => (
		<Option key={item.name+item.cat2_code} value={item.name} className={`${item.color_code} text-dimBlack`} > {item.name} </Option>
	))

	const category3 = c3List.sort(function (a, b) {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	}).map( (item) => (
		<Option key={item.name+item.cat2_code} value={item.name} className={`${item.color_code} text-dimBlack`} > {item.name} </Option>
	))

	const onCLick = async (e) => {
		miso.push([c1,c2,c3])
		
	}
	// console.log(miso)
  return (
		<>
			<div className='col-span-2 sm:col-start-1 mt-1 '>
				<Select label='Category 1' value={c1} onChange={handleCat1Change} className='h-11'>
					{category1}
				</Select>
				{(c1 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c1}</span> is selected</p> : null}
			</div>

			<div className='col-span-2 mt-1 '>
				<Select label='Category 2' value={c2} onChange={handleCat2Change} className='h-11'>
					{category2}
				</Select>
				{(c2 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c2}</span> is selected</p> : null}
			</div>

			<div className='col-span-2 mt-1 '>
				<Select label='Category 3' value={c3} onChange={handleCat3Change} className='h-11'>
					{category3}
				</Select>
				{(c3 != '') ? <p className='text-xs mt-1 ml-1'><span className='font-semibold'>{c3}</span> is selected</p> : null}
			</div>

			{/* <Button className='normal-case' onClick={onCLick}>Add Another Category</Button> */}
			
    {/* </div> */}
		</>
  )
}

export default SelectMISO