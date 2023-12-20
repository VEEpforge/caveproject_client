import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import AddStrain from './pages/strain/AddStrain';
import IsolationSource from './pages/isolation/IsolationSource';
import StrainCollection from './pages/strain/StrainCollection';
import SelectMISO from './components/SelectMISO';

const App = () => {
  return (
    <>
      <ToastContainer position='top-center' autoClose={2000}/>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />

            {/* pages */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/isolation-source' element={<IsolationSource />} />
            <Route path='/dropdown' element={<SelectMISO />} />

            {/* Admin/Collection/Profile */}
            <Route path='/add-strain' element={<AddStrain />} />
            <Route path='strain-collection' element={<StrainCollection />} />
          </Routes>
        </div>
      </Router>

      <div
        className='fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative right-[calc(70%-11rem)] aspect-[915/426] w-[30.125rem] -translate-x-1/4 rotate-[30deg] bg-gradient-to-tr from-green-300 to-yellow-300 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      {/* <div
          className='absolute inset-x-0 -bottom-[calc(100%+50rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-yellow-300 opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
      </div> */}
    </>
  )
}

export default App