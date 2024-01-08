import { useState } from "react"
import {
  Button,
  Card,
  CardBody,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Option
} from "@material-tailwind/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { category_1, category_2, category_3 } from "../constants/miso"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SidebarFilter = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  
  // const openDrawer = () => setOpen(true);
  // const closeDrawer = () => setOpen(false);
  
  return (
    <>
        <Card className="my-2 w-screen max-w-md h-screen rounded-none shadow-none bg-blue-gray-50">
          <CardBody>
            {/* <div className="mb-2 flex items-center gap-4 p-4">
              <Typography variant="h5" color="blue-gray">
                Isolation Categories
              </Typography>
            </div> */}
            <List>
              <Accordion
                open={open === 1}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 1}>
                  <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 hover:bg-blue-gray-100">
                    <Typography color="blue-gray" className="mr-auto font-semibold leading-5">
                      Isolation Categories
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="px-4 bg-white h-full">
                  <div className="flex flex-col gap-6">
                    <Select variant='standard' label="Level 1" > 
                      {
                        category_1.map( (item) => (
                          <Option className={item.color_code}>
                            {item.name}
                          </Option>
                        ))
                      }
                    </Select>

                    <Select variant='standard' label="Level 2" menuProps={{style:{maxHeight: 100}}}> 
                      {
                        category_1.map( (item) => (
                          <Option className={item.color_code}>
                            {item.name}
                          </Option>
                        ))
                      }
                    </Select>

                    <Select variant='standard' label="Level 3" lockScroll={true}> 
                      {
                        category_1.map( (item) => (
                          <Option className={item.color_code}>
                            {item.name}
                          </Option>
                        ))
                      }
                    </Select>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      MISO Level 2
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">

                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 3}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      MISO Level 3
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">

                </AccordionBody>
              </Accordion>
            </List>
          </CardBody>
        </Card>
    </>
  )
}

export default SidebarFilter
