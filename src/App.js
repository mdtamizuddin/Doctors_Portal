
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Navbar } from './Components/Common/Navbar/Navbar';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

import Appoinment from './Components/Pages/Apointment/Appoinment';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import ManageAppointment from './Components/Pages/Dashboard/ManageAppointment';
import Home from './Components/Pages/Home/Home';
import NotFound from './Components/Pages/NotFound';
import Login from './Components/Pages/User/Login';
import Redirect from './Components/Pages/User/Redirect';
import Register from './Components/Pages/User/Register';
import RequireAuth from './Components/RequireAuth/RequireAuth';

function App() {
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
        <Route path='/login' element={ <Login /> } />
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard /> 
        </RequireAuth> }>
          <Route index element={<ManageAppointment />}/>
          <Route path='appointments' element={<ManageAppointment />}/>
        </Route>
         
        <Route path='/register' element={<Register />} />
   
      </Routes>

    </div>
  );
}

export default App;
