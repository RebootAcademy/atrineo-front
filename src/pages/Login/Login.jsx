import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/Input/input"
import { Button } from "../../components/ui/Button/Button"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const navigate = useNavigate()

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onLogin()
    }
  }

  async function onLogin() {
    try {
      const loginResponse = await login({ email, password })
      if (loginResponse.token) {
        localStorage.setItem('token', loginResponse.token)
        localStorage.setItem('id', loginResponse.id)
        navigate('/map')
      }
    } catch (error) {
      setErrorMessage(true)
      console.error('Error', error)
    }
  }

  return (
    <>
      <div className='w-full h-full flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 md:space-x-24 lg:space-x-48'>
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'>
          <img
            src='./atrineo_icon-removebg-preview.png'
            alt='Atrineo icon'
            className='w-full'
          />
        </div>
        <div className='border-2 border-grey-700 rounded w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/4'>
          <div className='p-8'>
            <div className='text-center'>
              <p style={{ fontSize: "32px" }}>Login</p>
            </div>
            <div className='flex flex-col'>
              <label className='mb-2 font-bold' htmlFor='email'>
                Email:
              </label>
            </div>
            <Input
              type='text'
              id='email'
              name='email'
              className='border p-2 rounded' />
            <div className='flex flex-col mt-4'>
              <label className='mb-2 font-bold' htmlFor='password'>
                Password:
              </label>
            </div>
            <Input
              type='password'
              id='password'
              name='password'
              className='border p-2 rounded'
            />
            <div className='flex justify-center'>
              <Button className='mt-4 w-full'>
                Login
              </Button>
            </div>
            <div className='flex justify-center mt-4'>
              <input
                type='checkbox'
                id='forgotPasswordCheckbox'
                className='mr-2'
              />
              <label htmlFor='forgotPasswordCheckbox'>
                I forgot my password
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
