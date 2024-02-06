import { Button } from "../../ui/Button/Button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "../../ui/Sheet/sheet"

function LayersContainer() {
  return (
    <div className="grid grid-cols-2 gap-2 z-[9999999] relative top-20 left-4">
        <Sheet key='left'>
          <SheetTrigger asChild>
            <Button variant="outline">left</Button>
          </SheetTrigger>
          <SheetContent side='left' className="w-[300px] h-[500px]">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
{/*                 <Label htmlFor="name" className="text-right">
                  Name
                </Label> */}
{/*                 <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
{/*                 <Label htmlFor="username" className="text-right">
                  Username
                </Label> */}
{/*                 <Input id="username" value="@peduarte" className="col-span-3" /> */}
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
    </div>
  )

}

export default LayersContainer