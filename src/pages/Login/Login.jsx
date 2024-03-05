import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/Input/input"
import { Button } from "../../components/ui/Button/Button"
import { login } from "../../services/auth"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const openEye = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.33398 7.99992C1.33398 7.99992 3.33398 3.33325 8.00065 3.33325C12.6673 3.33325 14.6673 7.99992 14.6673 7.99992C14.6673 7.99992 12.6673 12.6666 8.00065 12.6666C3.33398 12.6666 1.33398 7.99992 1.33398 7.99992Z" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.00065 9.99992C9.10522 9.99992 10.0007 9.10449 10.0007 7.99992C10.0007 6.89535 9.10522 5.99992 8.00065 5.99992C6.89608 5.99992 6.00065 6.89535 6.00065 7.99992C6.00065 9.10449 6.89608 9.99992 8.00065 9.99992Z" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

  const closeEye = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1370_12806)">
      <path d="M6.58732 6.58659C6.39082 6.76968 6.23321 6.99048 6.1239 7.23582C6.01459 7.48115 5.95581 7.74598 5.95107 8.01452C5.94633 8.28307 5.99573 8.54981 6.09632 8.79884C6.19691 9.04788 6.34663 9.2741 6.53655 9.46402C6.72646 9.65394 6.95269 9.80366 7.20172 9.90425C7.45076 10.0048 7.7175 10.0542 7.98604 10.0495C8.25459 10.0448 8.51942 9.98598 8.76475 9.87667C9.01008 9.76736 9.23088 9.60975 9.41398 9.41325M7.15398 3.38659C7.43486 3.35159 7.71761 3.33378 8.00065 3.33325C12.6673 3.33325 14.6673 7.99992 14.6673 7.99992C14.3693 8.638 13.9955 9.23787 13.554 9.78658M4.40732 4.40659C3.08148 5.30967 2.02057 6.55009 1.33398 7.99992C1.33398 7.99992 3.33398 12.6666 8.00065 12.6666C9.27792 12.67 10.5278 12.2967 11.594 11.5933M1.33398 1.33325L14.6673 14.6666" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_1370_12806">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>

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
      if (loginResponse) {
        localStorage.setItem('token', loginResponse.result)
        // localStorage.setItem('role', loginResponse.role)
        navigate('/map')
      }
    } catch (error) {
      setErrorMessage(true)
      console.error('Credenciales incorrectas', error)
    }
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col lg:flex-row md:flex-col justify-center items-center space-y-12 lg:space-y-12 md:space-x-24 lg:space-x-24 mx-auto'>
        <div className='sm:w-1/6 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/6'>
          <img
            src='./atrineo_icon-removebg-preview.png'
            alt='Atrineo icon'
            className='w-full'
          />
        </div>
        <div className='border-2 border-grey-700 rounded w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/6'>
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
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Enter your password'
                className='border p-2 rounded'
                onKeyDown={handleKeyPress}
                onChange={handlePassword}
              />
              <div
                className='absolute top-3 right-4 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? openEye : closeEye}
              </div>
              <div className='flex justify-center mt-4'>
                {errorMessage && <p style={{ fontSize: "14px" }}>Credentials are wrong</p>}
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                className='mt-4 w-full'
                onClick={() => onLogin()}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
