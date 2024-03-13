import { Label } from "@/components/ui/Label/Label"
import { Input } from "@/components/ui/Input/input"
import { Button } from "@/components/ui/Button/Button"

function ContactUs() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border">
        <div>Contact Us</div>
        <div>How Can We Help You?</div>
        <Label>Name:</Label>
        <Input/>
        <Label>E-mail:</Label>
        <Input/>
        <Label>Company Name:</Label>
        <Input/>
        <Label>Phone Number:</Label>
        <Input/>
        <Label>Message:</Label>
        <Input/>
        <Button>Submit</Button>
      </div>
    </div>
  )
}

export default ContactUs