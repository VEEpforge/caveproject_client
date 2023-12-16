import React from "react"
import {
  Button,
  Card,
  CardBody,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react"


const SidebarFilter = () => {
  
  
  // const openDrawer = () => setOpen(true);
  // const closeDrawer = () => setOpen(false);
  
  return (
    <>
        <Card className="my-2 w-screen max-w-md h-screen rounded-none shadow-none bg-blue-gray-50">
          <CardBody>
            <Typography>
              Filter Bar
            </Typography>
          </CardBody>
        </Card>
    </>
  )
}

export default SidebarFilter
