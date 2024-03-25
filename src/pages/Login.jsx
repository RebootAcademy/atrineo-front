import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"

import { Input } from "../components/ui/Input/input"
import { Button } from "../components/ui/Button/Button"
import { EyeOffIcon, EyeIcon } from "@/components/ui/Icons/Icons"

import { login } from "../services/auth"

import { UserContext } from "../context/userContext"

function Login() {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleKeyPress = (event) => {
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

  const onContactUs = () => {
    navigate('/contactus')
  }

  async function onLogin() {
    try {
      setLoading(true)

      //Promise to manage request timeout
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 60000)
      })

      const loginRequest = () => login({ email, password })

      // Using Promise.race to race the login attempt against the timeout
      const loginResponse = await Promise.race([loginRequest(), timeoutPromise])

      if (loginResponse) {
        setLoading(false)
        localStorage.setItem('token', loginResponse.result.token)
        await setUser(loginResponse.result.user)
        setLoading(false)
        navigate('/map')
      }
    } catch (error) {
      if (error.message === 'Request timeout') {
        console.log('Login request timed out. Retrying...')
        onLogin() // Retry login
      } else {
        setErrorMessage(true)
        console.error('Credenciales incorrectas:', error)
      }
    }
  }

  return (
    <>
      <div className='w-full h-screen flex md:flex-row flex-col justify-center items-center'>
        <div className='w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/6 relative mb-8 md:mb-0'>
          <img
            src='./atrineo_icon-removebg-preview.png'
            alt='Atrineo icon'
            className='w-full'
          />
        </div>
        <div className='sm:w-5/6 md:w-2/3 lg:w-2/3 xl:w-1/3 2xl:w-2/6 flex flex-col justify-center items-center'>
          <div className='border-2 border-gray-200 rounded-xl w-full sm:w-5/6 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-5/6'>
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
                  {showPassword ? <EyeIcon/> : <EyeOffIcon/>}
                </div>
                <div className='flex justify-center mt-4'>
                  {errorMessage && <p style={{ fontSize: "14px" }}>Credentials are wrong</p>}
                </div>
              </div>
              <div className='flex justify-center'>
                {
                  loading ? 
                    <LoadingSpinner width="34px" height="34px" /> :
                    <Button
                      className='mt-4 w-full'
                      onClick={() => onLogin()}
                    >
                      Login
                    </Button>
                }
              </div>
            </div>
          </div>
          <div
            className='flex mt-2 border-2 border-gray-200 rounded-xl w-full h-12 sm:w-5/6 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-5/6 text-grey'
            onClick={onContactUs}
          >
            <button className='w-full py-2 text-gray-400 font-semibold underline underline-offset-3 text-xs rounded-lg'>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
