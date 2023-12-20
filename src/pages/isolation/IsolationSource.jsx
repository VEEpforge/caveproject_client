import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Navbar, SidebarFilter } from '../../components'
import {
  Button,
  Collapse,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import styles from '../../style'
import IsolationTable from './IsolationTable'
import IsolationMap from './IsolationMap'

const data = [
  {
    label: "Table",
    value: "table",
    body: <IsolationTable />
  },
  {
    label: "Map",
    value: "map",
    body: <IsolationMap />
  },
  {
    label: "Krona",
    value: "krona",
    body: <IsolationTable />
  },
  {
    label: "Download",
    value: "download",
    body: <IsolationTable />
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IsolationSource = () => {
  // SideBarFilter
  const [open, setOpen] = React.useState(true);
  const toggleOpen = () => setOpen((cur) => !cur);

  // Tabs
  const [activeTab, setActiveTab] = React.useState("table");

  return (
    <>
    
		
      <header className=''>
        {/* <div className={`${styles.boxWidth} focus:scroll-auto`}> */}
          <Navbar />
        {/* </div> */}
      </header>
      <div className='flex flex-wrap '>
        <section className={classNames(
          !open ? 'hidden' : 'flex-shrink'
        )}>
          <Collapse open={open}>
            <SidebarFilter/>
          </Collapse>
        </section>
        <section className='flex-grow'>
          <div className='max-w-full bg-gray-200 ring-2 ring-inset ring-primary border-1 px-2 py-2 mt-2 mx-4'>
            <Button onClick={toggleOpen} >Open Collapse</Button>
          </div>
          <div className='mx-4'>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-4"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-primary shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-primary font-semibold" : "font-normal"}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, body }) => (
                  <TabPanel key={value} value={value}>
                    {body}
                  </TabPanel>
                ))}
                {/* <IsolationMap /> */}
              </TabsBody>
            </Tabs>
          </div>
          
        </section>
      </div>
      
		</>
  )
}

export default IsolationSource