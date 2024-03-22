import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import Logo from '../../assets/logo.svg'
import { Spinner } from '../../components/index'

const Login = () => {
  const [data, setData] = useState({
    email : '',
    password: '',
  })

  const { email, password } = data

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, loading, error } = useSelector( (state) => state.auth )

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (user) {
      setData({})
      navigate('/')
      toast.success('Welcome back!')
    }
    if (loading) {
      <Spinner />
    }

    dispatch(reset)
  }, [ user, loading, error, navigate, dispatch ])

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    try {
      dispatch(login(userData))
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
			      
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 Inter'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Link to='/' >
            <img
              className='mx-auto h-14 w-auto'
              src={Logo}
              alt='Logo'
            />
          </Link>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dimBlack'>
            Log in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-dimBlack'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  placeholder='your_email@up.edu.ph'
                  autoComplete='email'
                  onChange={onChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-dimBlack'>
                  Password
                </label>
                {/* <div className='text-sm'>
                  <a href='#' className='font-semibold text-primary hover:text-dimBlack'>
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  placeholder='At least 8 characters'
                  onChange={onChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-dimBlack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {/* {loading ? 'Loading...' : 'Login'} */}
                Log in
              </button>
            </div>
          </form>

          {/* { isLoading && <Spinner /> } */}

          <p className='mt-10 mb-2 text-center text-sm text-dimBlack'>
            Not a member?{' '}
          </p>
					<div>
              <Link to='/signup'>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-white border border-dimBlack px-3 py-1.5 text-sm font-semibold leading-6 text-dimBlack shadow-sm hover:bg-dimBlack hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Sign up
                </button>
              </Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login