import { useContext, useState, useEffect, useRef } from "react"
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
import { CollectionContext } from "@/context/collectionContext"
import CustomButton from "@/components/CustomButton/CustomButton"

function ColumnsModal() {
  const { collection } = useContext(CollectionContext)
  const [isOpen, setIsOpen] = useState(false)
  const [hiddenColumns, setHiddenColumns] = useState([])
  const cardRef = useRef(null)

  const fields = collection.data && collection.data.length > 0 ? collection.data[0].fields : []
  const columnNames = fields.map(f => f.fieldName)

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

  const toggleColumnVisibility = (columnName) => {
    setHiddenColumns(prevHiddenColumns => {
      if (prevHiddenColumns.includes(columnName)) {
        return prevHiddenColumns.filter(col => col !== columnName)
      } else {
        return [...prevHiddenColumns, columnName]
      }
    })
  }

  const handleAccept = () => {
    const updatedData = collection.data.map(item => {
      const updatedFields = item.fields.filter(field => !hiddenColumns.includes(field.fieldName))
      return { ...item, fields: updatedFields }
    })
    setHiddenColumns(updatedData)
    console.log('Columnas ocultas:', hiddenColumns)
    setIsOpen(false)
  }


  return (
    <div className="relative text-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button onClick={toggleMenu} className="z-10">
            <div className="flex items-center">
              <EyeOffIconColumns />
              <p>Columns</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      {isOpen && (
        <div className="absolute top-0 right-0 z-20" ref={cardRef}>
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
                      onChange={() => toggleColumnVisibility(columnName)}
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
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <CustomButton
                text="Accept"
                onClick={handleAccept}
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ColumnsModal
