
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Navbar } from './Components/Common/Navbar/Navbar';
import Contact from './Components/Contact/Contact';
import auth from './Components/Firebase/firebase.init';
import Footer from './Components/Footer/Footer';
import useUser from './Components/Hook/useUser';

import Appoinment from './Components/Pages/Apointment/Appoinment';
import Admins from './Components/Pages/Dashboard/Admins';
import AllApointment from './Components/Pages/Dashboard/AllApointment';
import AllUsers from './Components/Pages/Dashboard/AllUsers';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import ManageAppointment from './Components/Pages/Dashboard/ManageAppointment';
import Users from './Components/Pages/Dashboard/Users';
import Home from './Components/Pages/Home/Home';
import NotFound from './Components/Pages/NotFound';
import Login from './Components/Pages/User/Login';

import Register from './Components/Pages/User/Register';
import RequireAuth from './Components/RequireAuth/RequireAuth';

function App() {

  const [user] = useAuthState(auth)
  const { currentUser } = useUser()
  useEffect(() => {
    if (user?.email) {
      const url = `https://mysterious-dusk-87796.herokuapp.com/user/${user.email}`
      axios.put(url, {
        user
      })
        .then(res => {
          const myToken = res.data.accessToken
          localStorage.setItem('accessToken', myToken)
        })
    }
  }, [user])

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<div>
          <Contact />
          <Footer />
        </div>} />
        <Route path='/appointment' element={<RequireAuth >
          <Appoinment />
        </RequireAuth>} />

        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard />
        </RequireAuth>}>
          <Route index element={currentUser?.role === 'admin'
            ?
            <AllApointment />
            :
            <ManageAppointment />
          } />
          <Route path='appointments' element={currentUser?.role === 'admin'
            ?
            <AllApointment />
           
            :
            
            <ManageAppointment />
            } />
          {
            currentUser?.role === 'admin' &&
            <Route path='users' element={<AllUsers />} >
              <Route index element={<Users />} />
              <Route path='admins' element={<Admins />} />
              <Route path='all-user' element={<Users />} />
            </Route>
          }

        </Route>

        <Route path='/register' element={<Register />} />

      </Routes>

    </div>
  );
}

export default App;
