import { Button } from "@/components/ui/button"

function Home () {
  return (
    <>
      Home
      <div>
        <Button 
          onClick={()=> console.log('click')}
        >
          Default Button
        </Button>
        <Button 
          variant="outline"
          onClick={()=> console.log('click')}
        >
          Outline Button
        </Button>
        <Button 
          variant="destructive"
          size="lg"
          onClick={()=> console.log('click')}
        >
          Destructive Large Button
        </Button>
        <Button 
          variant="ghost"
          onClick={()=> console.log('click')}
        >
          Ghost Button
        </Button>
      </div>
    </>
  )
}

export default Home