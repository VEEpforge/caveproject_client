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

const data = [
  {
    label: "Table",
    value: "table",
  },
  {
    label: "Map",
    value: "map",
  },
  {
    label: "Krona",
    value: "krona",
  },
  {
    label: "Download",
    value: "download",
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
          <div>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-4"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900 font-semibold" : "font-normal"}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {/* {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))} */}
              </TabsBody>
            </Tabs>
          </div>
          
        </section>
      </div>
      
			<div className='w-full h-screen bg-slate-50 opacity-20'>

    </div>
		<div className='w-screen h-screen bg-slate-100'></div>
		</>
  )
}

export default IsolationSource