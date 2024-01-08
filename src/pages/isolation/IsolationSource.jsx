import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Navbar, SidebarFilter, Spinner } from '../../components'
import {
  Button,
  Collapse,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react'
import { IsolationTable, IsolationMap, Krona } from './index'
import { getAllStrains, reset } from '../../features/strain/strainSlice'
import { toast } from 'react-toastify'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IsolationSource = () => {
  
  // SideBarFilter
  const [ open, setOpen ] = useState(true);
  const toggleOpen = () => setOpen((cur) => !cur);

  // Tabs
  const [activeTab, setActiveTab] = useState('table');

  // Strains
  const [ data, setData ] = useState(null)
  const { strains, loading, error } = useSelector( (state) => state.strain )
  const dispatch = useDispatch()

  

  useEffect(() => {
    
    if (error) {
      toast.error(error)
    }
    
    dispatch(getAllStrains())

    return () => {
      dispatch(reset())
    }
  },[ error, dispatch ])


  console.log('Data: ' + data)
  if (loading) {
    return <Spinner />
  }


  const tabs = [
    {
      label: 'Table',
      value: 'table',
      body: <IsolationTable strains={strains} />
    },
    {
      label: 'Map',
      value: 'map',
      body: <IsolationMap />
    },
    {
      label: 'Krona',
      value: 'krona',
      body: <Krona />
    },
    {
      label: 'Download',
      value: 'download',
      body: <Krona />
    },
  ]

  return (
    <div>
      <header className='top-0'>
        <Navbar />
      </header>
      <div className='flex pt-20'>
        <section className={classNames(
          !open ? 'hidden' : 'flex-wrap h-full', 'pt-5'
        )}>
          <Collapse open={open}>
            <SidebarFilter/>
          </Collapse>
        </section>
        <section className='flex-grow pt-5'>
          <div className='max-w-full bg-gray-200 ring-2 ring-inset ring-primary border-1 px-2 py-2 mt-2 mx-4'>
            <Button onClick={toggleOpen} >{!open? 'Open' : 'Close'}</Button>
            {/* <Collapse open={open}>
              <SidebarFilter/>
            </Collapse> */}
          </div>
          <div className='mx-4'>
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
                {tabs.map(({ value, body }) => (
                  <TabPanel key={value} value={value}>
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