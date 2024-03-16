import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { logout } from '../features/auth/authSlice'
import Logo from '../assets/logo.svg'
import { Button } from '@material-tailwind/react'

const navigation = [
  { name: 'Home', href: '/', value: 'home' },
  { name: 'Taxonomy', href: '#', value: 'taxonomy' },
  { name: 'Isolation source', href: '/isolation-source', value: 'isolation' },
  { name: 'About', href: '#', value: 'about' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    e.preventDefault()

    try {
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

	// Mobile
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

	// Page/Tab
	const [activeTab, setActiveTab] = useState('home');

  return (
    <div className=''>
      <header className='absolute inset-x-0 top-0 z-50 border-b border-gray-900/10'>
        <nav className='flex items-center justify-between p-6 lg:px-10' aria-label='Navbar'>
          <div className='flex lg:flex-1'>
						<Link to='/'>
              <img
                className='h-8 w-auto'
                src={Logo}
                alt='Logo'
              />
            </Link>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            { navigation.map( (item) => (
							<Link
								key={item.name}
								type='button'
								to={item.href}
								onClick={() => setActiveTab(item.value)}
								className={classNames(
									activeTab === item.value ? 'text-primary font-bold' : 'text-dimBlack hover:text-primary font-semibold',
									'px-3 py-2 lg:text-lg focus:text-primary focus:font-bold'
								)}
                // className='text-dimBlack hover:text-primary focus:font-bold focus:text-primary font-semibold px-3 py-2 lg:text-lg'
							>
								{item.name}
							</Link>
            ))}
						{ user?.user_level === 'ADMIN' ?  (
              <Link
                to='/strain-collection'
                type= 'button'
								onClick={() => setActiveTab('collection')}
                className={classNames(
									activeTab === 'collection' ? 'text-primary font-bold' : 'text-dimBlack hover:text-primary font-semibold',
									'px-3 py-2 lg:text-lg'
								)}
              >
								Collection
							</Link>
              ) : null
            }
          </div>
					{ user ?
						(
							<div className='hidden lg:flex lg:flex-1 lg:justify-end ml-1'>
                <div className='border-l px-2'/>
								<UserIcon className='inline-flex mr-1 mt-3 h-5 w-5 text-gray-500 items-center' aria-hidden='true' />
                <h3 className='inline-flex text-gray-500 items-center'>{user.name}</h3>
                <Link
                  to='/'
                  // type='button'
                  onClick={onLogout}
                  className='inline-flex ml-2'
                >
                  <Button className='bg-primary normal-case font-semibold text-base lg:text-lg lg:px-4 lg:py-2 hover:bg-dimBlack'>
                    Log out  <span aria-hidden='true' className='font-semibold'> &rarr;</span>
                  </Button>
                </Link>
              </div>
						) : (	
							<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
								<Link
									to='/signup'
									type='button'
									className='inline-flex'
								>
									<Button variant='text' className='normal-case font-semibold text-base lg:text-lg lg:px-4 lg:py-2 text-dimBlack hover:bg-dimBlack hover:text-dimWhite'>
                    Sign up
                  </Button>
								</Link>
								<Link
									type='button'
									to='/login'
									className='inline-flex ml-2'
								>
									<Button className='bg-primary normal-case font-semibold text-base lg:text-lg px-4 py-2 hover:bg-dimBlack'>
                    Log in  <span aria-hidden='true' className='font-semibold'> &rarr;</span>
                  </Button>
								</Link>
							</div>
						)
					}
        </nav>

				{/* Mobile View */}
        <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dimWhite px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
							<Link to='/'>
								<img
									className='h-8 w-auto'
									src={Logo}
									alt='Logo'
								/>
							</Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>

            {/* User name */}
            { user ?
              (
                <div className='mt-6 flex'>
                  <UserIcon className='inline-flex mr-2 mt-0.5 h-5 w-5 text-gray-500 items-center' aria-hidden='true' />
                  <h3 className='inline-flex text-gray-500 items-center'>{user.name}</h3>
                </div>
              ) : null
            }

            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-dimBlack hover:bg-gray-50'
                    >
                      {item.name}
                    </Link>
                  ))}
									{ user?.user_level === 'ADMIN' ?  (
										<Link
											to='/strain-collection'
											type= 'button'
											className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-dimBlack hover:bg-gray-50'
										>
											Collection
										</Link>
										) : null
									}
                </div>
								{ user ?
									(
										<Link
												type='button'
												to='/'
												onClick={onLogout}
												className='w-full rounded-lg bg-primary px-3 py-2.5 text-base font-semibold leading-7 text-dimWhite hover:bg-dimBlack justify-between items-center'
											>
												Log out
										</Link>
									) : (
										<div className='flex items-center gap-x-1 py-4'>
											<Link
												type='button'
												to='/login'
												className='w-full rounded-lg bg-primary px-3 py-2.5 text-base font-semibold leading-7 text-dimWhite hover:bg-dimBlack justify-between items-center'
											>
												Log in
											</Link>
											<Link
												to='/signup'
												className='w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
											>
												Sign up
											</Link>
										</div>
									)
								}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}
