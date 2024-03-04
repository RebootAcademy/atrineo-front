import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/Input/input"
import { Button } from "../../components/ui/Button/Button"
import { login } from "../../services/auth"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const navigate = useNavigate()

  const handleKeyPress = (event) => {
    console.log(event.key)
    if (event.key == 'Enter') {
      onLogin()
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrorMessage(false)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrorMessage(false)
  }

  async function onLogin() {
    try {
      const loginResponse = await login({ email, password })
      console.log(loginResponse)
      if (loginResponse.result) {
        localStorage.setItem('token', loginResponse.result)
        console.log('navigating to /map')
        navigate('/map')
      }
    } catch (error) {
      setErrorMessage(true)
      console.error('Credenciales incorrectas', error)
    }
  }

  return (
    <>
      <div className='w-full h-full flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-8 md:space-x-24 lg:space-x-48'>
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
            <div
              className='flex flex-col'
            >
              <label
                className='mb-2 font-bold'
                htmlFor='email'

              >
                Email:
              </label>
            </div>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='border p-2 rounded'
              onKeyDown={handleKeyPress}
              onChange={handleEmail}
            />
            <div className='flex flex-col mt-4'>
              <label
                className='mb-2 font-bold'
                htmlFor='password'
              >
                Password:
              </label>
            </div>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='border p-2 rounded'
              onKeyDown={handleKeyPress}
              onChange={handlePassword}
            />
            <div className='flex justify-center mt-4'>
              {errorMessage && <p style={{ fontSize: "12px" }}>Credentials are wrong</p>}
            </div>
            <div className='flex justify-center'>
              <Button
                className='mt-4 w-full'
                onClick={() => onLogin()}
              >
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
