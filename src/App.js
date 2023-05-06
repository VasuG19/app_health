import './index.css';
import NavBar from './componants/nav';
import HomePage from './pages/home.js';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Appointments from './pages/appointments';
import Timetable from './pages/calendar';
import Profile from './pages/profile';
import Register from './componants/register';
import Login from './componants/login';
import axios from 'axios';
import Footer from './componants/footer';
import Admin from './pages/admin';
import NotFound from './componants/notFound';
import ClientRegister from './componants/clientRegister';
import ClientLogin from './componants/clientLogin';
import ClientDetails from './componants/clientDetails';
import Clients from './pages/client';

/**
 * App Page 
 * 
 * calls all routes and pages then exports them to index.js
 * 
 * @author Mehtab Gill
 */

// Main App function - calls all componants and routes for the app 
function App() {

  // declare variables
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin]  = useState(false);
  const [servicesHome, setServicesHome] = useState([]);
  const [services, setServices] = useState([]);
  const [clientData, setClientData]  = useState([]);
  const [patientData, setPatientData]  = useState([]);

  // validate whether the user is authenticated
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    if (!user ||user.title!== 'client') {
      setIsAdmin(false)
      setPatientData({
          id: user.id,
        })
      } else {
        setIsAdmin(true)
        setClientData({
          id: user.client.id,
          institute: user.client.institute,
          address: user.client.address
        })
        
        setServices(user.client)
      }
  },[user]);

  // retrieve the user data from the api
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true)
      const getUserData = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
            headers: { Authorization: `Bearer ${userToken}`,},
          });
          setUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      getUserData();
    }
  }, [userToken]);

 // retrieve the user data from the api
  useEffect(() => {
    const getServices = async () => {
      fetch(`http://localhost:1337/api/services?populate=*`)
        .then((response) => response.json())
        .then((json) => {
          // limit the number of services received to 3
          const limitedServices = json.data.slice(0, 3);
          setServicesHome(limitedServices);
        })
        .catch((err) => console.log(err.message));   
    }
    getServices();
  }, []);

  // return routes to index.js for the different pages of the web-app while calling relevant functions 
  return (
    <div className="App">
       <div className='nav'>
          <NavBar authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>
        </div>
      { authenticated &&
        <Routes>
          <Route path="/" element={<HomePage user={user} services={servicesHome} />} />
          <Route path='*' element={<NotFound />}/>
          <Route path="/appointments" element={<Appointments user={user} patient={patientData} client={clientData}/>} />
          <Route path="/calendar" element={<Timetable user={user} patient={patientData} client={clientData}/>} />
          <Route path="/profile" element={<Profile authenticated={authenticated} patient={patientData} user={user} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Profile authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/client-details" element={<ClientDetails user={user} />}/>
          <Route path="/clients" element={<Clients user={user} />}/>
          <Route path="/admin" element={<Admin authenticated={authenticated} 
                                               user={user} 
                                               clientData={clientData} 
                                               service={services} 
                                               Admin={isAdmin} 
                                               handleAuthenticated={setAuthenticated} />} />
        </Routes>
      } 
      {!authenticated &&
        <Routes>
          <Route path='*' element={<NotFound />}/>
          <Route path="/" element={<HomePage user={user} services={servicesHome} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/client-register" element={<ClientRegister/>} />
          <Route path="/client-login" element={<ClientLogin authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
        </Routes>
      }
      <Footer/>
    </div>
  );
}

export default App