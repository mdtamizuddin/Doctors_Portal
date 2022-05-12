
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Common/Navbar/Navbar';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

import Appoinment from './Components/Pages/Apointment/Appoinment';
import Home from './Components/Pages/Home/Home';
import NotFound from './Components/Pages/NotFound';
import Login from './Components/Pages/User/Login';
import Redirect from './Components/Pages/User/Redirect';
import Register from './Components/Pages/User/Register';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<div>
          <Contact />
          <Footer />
        </div>} />
        <Route path='/appointment' element={<Appoinment />} />
        <Route path='/login' element={ <Login /> } />
         
        <Route path='/register' element={<Register />} />
   
      </Routes>

    </div>
  );
}

export default App;
