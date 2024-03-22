import PropTypes from 'prop-types'
<<<<<<< HEAD
import { useContext, useState, useEffect, useRef } from "react"
=======
import { useState, useEffect, useRef } from "react"
>>>>>>> 7f69724ac0601561bfdcb45371cc831f06d4be9c
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/Card/Card"
import { EyeOffIconColumns } from "@/components/ui/Icons/Icons"
import { Button } from "@/components/ui/Button/Button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/DropDown/DropdownMenu"
import { Checkbox } from "@/components/ui/Checkbox/Checkbox"
<<<<<<< HEAD
import { CollectionContext } from "@/context/collectionContext"
// import CustomButton from "@/components/CustomButton/CustomButton"

function ColumnsModal({ hiddenColumns, setHiddenColumns }) {
  const { collection } = useContext(CollectionContext)
  const [isOpen, setIsOpen] = useState(false)

=======


function ColumnsModal({ columnNames, hiddenColumns, setHiddenColumns }) {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingHiddenColumns, setPendingColumns] = useState([...hiddenColumns])
  const initialHiddenColumns = useRef([...hiddenColumns])
>>>>>>> 7f69724ac0601561bfdcb45371cc831f06d4be9c
  const cardRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [cardRef])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleAccept = () => {
    console.log('Accept clicked')
    setIsOpen(false)
  }
  
  const handleCancel = () => {
    console.log('Cancel clicked')
    setIsOpen(false)
  }

  const toggleColumnVisibility = (columnName) => {
    if (pendingHiddenColumns.includes(columnName)){
      setPendingColumns(prevHiddenColumns => prevHiddenColumns.filter(col => col !== columnName))
    } else {
      setPendingColumns(prevHiddenColumns => [...prevHiddenColumns, columnName])
    }
  }

  const handleAccept = () => {
    setHiddenColumns([...pendingHiddenColumns])
    setIsOpen(false)
  }

  const handleCancel = () => {
    setPendingColumns([...initialHiddenColumns.current])
    setHiddenColumns([...initialHiddenColumns.current])
    setIsOpen(false)
  }

  return (
    <div className="text-center flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={toggleMenu}
            className="z-10"
          >
            <div className="flex items-center">
              <EyeOffIconColumns />
              <p>Columns</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      {isOpen && (
        <div className="absolute top-14 right-0 z-20" ref={cardRef}>
          <Card className="w-96 bg-white p-6">
            <CardHeader className='flex justify-center'>
              <CardTitle className="text-cyan-800">Select the columns you want to hide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2">
                {columnNames?.map((columnName, index) => (
                  <div key={index} className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      onCheckedChange={() => toggleColumnVisibility(columnName)}
                      checked={pendingHiddenColumns.includes(columnName)}
                    />
                    <span>{columnName}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className='mt-4 flex justify-between'>
              <Button
                className="w-24 mr-2"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                text='Accept'
                onClick={handleAccept}
              >
                Accept
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

ColumnsModal.propTypes = {
  hiddenColumns: PropTypes.array,
  setHiddenColumns: PropTypes.func,
  columnNames: PropTypes.array
}

export default ColumnsModal
