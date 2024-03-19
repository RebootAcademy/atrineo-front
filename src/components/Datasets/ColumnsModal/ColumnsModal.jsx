 
import { useContext, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/DropDown/DropdownMenu"
import { EyeOffIconColumns } from "@/components/ui/Icons/Icons"
import { Button } from "@/components/ui/Button/Button"
import { DropdownMenuSeparator } from "@/components/ui/DropdownMenu/DropdownMenu"
import { Checkbox } from "@/components/ui/Checkbox/Checkbox"
import { CollectionContext } from "@/context/collectionContext"
import CustomButton from "@/components/CustomButton/CustomButton"

function ColumnsModal() {
  const { collection } = useContext(CollectionContext)
  const [isOpen, setIsOpen] = useState(false)

  const fields = collection.data && collection.data.length > 0 ? collection.data[0].fields : []
  const columnNames = fields.map(f => f.fieldName)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={toggleMenu}>
              <div className='flex items-center'>
                <EyeOffIconColumns />
                <p>Columns</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          {isOpen && (
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select the columns you want to hide</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columnNames?.map((columnName, index) => (
                <DropdownMenuItem key={index}>
                  <div className='flex items-center'>
                    <Checkbox className='mr-2' />
                    <span>{columnName}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <CustomButton />
              <CustomButton />
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </>
  )
}

export default ColumnsModal
