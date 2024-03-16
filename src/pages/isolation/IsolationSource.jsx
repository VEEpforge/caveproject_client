import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, SidebarFilter, Spinner } from '../../components'
import { Button, Collapse, Tabs, TabsHeader, TabsBody, Tab, TabPanel, ButtonGroup} from '@material-tailwind/react'
import { IsolationTable, IsolationMap, Krona, Metrics } from './index'
import { getAllStrains, reset } from '../../features/strain/strainSlice'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
// import GetStrains from './GetStrains'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getStrains () {
	const { strains, loading, error } = useSelector( (state) => state.strain )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( getAllStrains() )

    return () => {
      dispatch(reset())
    }
  },[ dispatch ])

	useEffect(() => {
		if (error) {
      toast.error(error)
    }
	}, [ error ])  

  if (loading) {
		return <Spinner />
	}

  // console.log(strains)
	
  return strains;
}

const IsolationSource = () => {
  // SideBarFilter
  const [ open, setOpen ] = useState(true);
  const toggleOpen = () => setOpen((cur) => !cur);

  const [ openMap, setOpenMap ] = useState(false);
  const toggleOpenMap = () => setOpenMap((cur) => !cur);

  // Tabs
  const [activeTab, setActiveTab] = useState('table');

  // Strains
  const { strains, loading, error } = useSelector( (state) => state.strain )
  const data = getStrains()

  const dispatch = useDispatch()

  //Filters
  const [ filteredData, setFilteredData ] = useState(data)
  const handleFilterData = (data) => {
		// setFilteredData(data)
    // dataRef.current = data
    setFilteredData( prevState => data )
	}

  useEffect(() => {
    console.log(filteredData)
    console.log(data)
    setFilteredData(data)
  }, [])


  const tabs = [
    {
      label: 'Table',
      value: 'table',
      body: <IsolationTable strains={filteredData} />
    },
    {
      label: 'Map',
      value: 'map',
      body: <IsolationMap strains={strains} handleFilterData={handleFilterData}  />
    },
    {
      label: 'Metrics',
      value: 'metrics',
      body: <Metrics strains={data} />
    },
    {
      label: 'Download',
      value: 'download',
      body: <Krona />
    },
  ]

  // console.log(data)

  return (
    <div>
      <Navbar />

      <div className='flex mt-20'>
        <section className={classNames(
          !open ? 'hidden' : 'flex-wrap h-full', 'pt-5'
        )}>
          <Collapse open={open}>
            {/* Not working */}
            {/* <SidebarFilter strains={strains} handleFilterData={handleFilterData} /> */}
            <Sidebar strains={strains} handleFilterData={handleFilterData} />
          </Collapse>
        </section>
        <section className='flex-grow pt-5'>
          {/* Not working */}
          <div className='max-w-full bg-gray-200 ring-2 ring-inset ring-primary border-1 px-2 py-2 mt-2 mx-4'>
            <Button onClick={toggleOpen} >{!open? 'Open' : 'Close'}</Button>
          </div>
          <div>
            {/* <ButtonGroup fullWidth className='my-4 ml-10 mr-20'>
              <Button
                onClick={toggleOpen}
                className='normal-case font-semibold text-base font-poppins'
              >
                {!open? 'Open Filter' : 'Close Filter'}
              </Button>
              {tabs.map(({ label, key, value }) => (
                <Button
                  key = {key}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  // className={activeTab === value ? 'text-dimBlack font-semibold' : 'text-gray-700 font-normal'}
                  className='normal-case font-semibold text-base font-poppins'
                >
                 {label}
                </Button>
              ))}
            </ButtonGroup> */}
          </div>
          <div className='mx-4'>
            {/* <Collapse openMap={openMap}>
              <IsolationMap strains={strains} />
            </Collapse> */}

            <Tabs value={activeTab}>
              <TabsHeader
                className='rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-4'
                indicatorProps={{
                  className:
                    'bg-transparent border-b-2 border-primary shadow-none rounded-none',
                }}
              >
                {tabs.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? 'text-dimBlack font-semibold' : 'text-gray-700 font-normal'}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {tabs.map(({ value, body, index }) => (
                  <TabPanel key={value+index} value={value}>
                    {body}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
            
          </div>
          
        </section>
      </div>
      
		</div>
  )
}

export default IsolationSource