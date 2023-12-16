import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Logo from '../../assets/logo.svg'
import { Spinner } from '../../components/index'

const Signup = () => {
  const [ data, setData ] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    institution: '',
    address: '',
    user_level: 'ADMIN' // set as default if not changed
  })

  const { name, email, password, confirm_password, institution, address, user_level } = data

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, loading, error } = useSelector( (state) => state.auth )


  useEffect( () => {
    if (error) {
      toast.error(error)
    }
    if (user) {
      setData({})
      navigate('/')
      toast.success('Welcome to Cave Project!')
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
      name,
      email,
      password,
      institution,
      address,
      user_level,
    }

    if(password != confirm_password) {
      toast.error('Passwords do not match')
    } else {
      dispatch(signup(userData))        
    }
  }


  return (
    <>
      {/* <div className={`${styles.boxWidth} fixed`}>
        <Navbar />
      </div> */}
			
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 Inter'>
        
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Link to='/' >
            <img
              className='mx-auto h-10 w-auto'
              src={Logo}
              alt='Logo'
            />
          </Link>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dimBlack'>
            Create an account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit}>

            <div>
              <label htmlFor='name' className='block text-sm font-medium leading-6 text-dimBlack'>
                Full name
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={name}
                  placeholder='Enter your full name'
                  onChange={onChange}
                  autoComplete='text'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label htmlFor='institution' className='block text-sm font-medium leading-6 text-dimBlack'>
                Institution
              </label>
              <div className='mt-1'>
                <input
                  id='institution'
                  name='institution'
                  type='text'
                  value={institution}
                  placeholder='Enter your institution'
                  onChange={onChange}
                  autoComplete='text'
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label htmlFor='address' className='block text-sm font-medium leading-6 text-dimBlack'>
                Address
              </label>
              <div className='mt-1'>
                <input
                  id='address'
                  name='address'
                  type='text'
                  value={address}
                  placeholder='Enter your City/Province'
                  onChange={onChange}
                  autoComplete='text'
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-dimBlack'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  placeholder='your_email@up.edu.ph'
                  onChange={onChange}
                  autoComplete='email'
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
              </div>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  placeholder='At least 8 characters'
                  onChange={onChange}
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-dimBlack'>
                  Confirm Password
                </label>
              </div>
              <div className='mt-1'>
                <input
                  id='confirm_password'
                  name='confirm_password'
                  type='password'
                  value={confirm_password}
                  placeholder='At least 8 characters'
                  onChange={onChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='user_level' className='block text-sm font-medium leading-6 text-dimBlack'>
                  User level
                </label>
              </div>
              <div className='mt-1'>
                <select
                  id='user_level'
                  name='user_level'
                  value={user_level}
                  onChange={onChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value='ADMIN'>ADMIN</option>
                  <option value='GUEST'>GUEST</option>
                </select>
                </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-dimBlack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign up
              </button>
            </div>
          </form>

          <p className='mt-10 mb-2 text-center text-sm text-dimBlack'>
            Already have an account?{' '}
          </p>
					<div>
            <Link to='/login'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-white border border-dimBlack px-3 py-1.5 text-sm font-semibold leading-6 text-dimBlack shadow-sm hover:bg-dimBlack hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Login
              </button>
              </Link>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Signup