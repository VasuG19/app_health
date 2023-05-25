import './index.css';
import NavBar from './componants/nav';
import HomePage from './pages/home.js';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Appointments from './pages/appointments';
import Profile from './pages/profile';
import Register from './componants/register';
import Login from './pages/login';
import axios from 'axios';
import Footer from './componants/footer';
import Admin from './pages/admin';
import NotFound from './componants/notFound';
import ClientRegister from './componants/clientRegister';
import FirstLogin from './componants/firstLogin';
import UserTitle from './componants/userTitle';
import Clients from './pages/client';
import ClientError from './componants/clientError';
import ForgotPass from './componants/forgotPass';
import Reset from './componants/reset';

/**
 * App Page 
 * 
 * calls all routes and pages then exports them to index.js
 * 
 * @author Mehtab Gill
 */

// Main App function - calls all componants and routes for the app 
function App() {
  
  // declare variables and states
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin]  = useState(false);
  const [servicesHome, setServicesHome] = useState([]);
  const [services, setServices] = useState([]);
  const [clientData, setClientData]  = useState([]);
  const [patientData, setPatientData]  = useState([]);
  
  // To validate whether the user is authenticated
  const userToken = localStorage.getItem('token');
  
  // retrieve data of the current logged in user from the API
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

  // If the user is a patient set and store their patient 
  useEffect(() => {
    if (!user || user.title !== 'client') {
      setIsAdmin(false);
      if (user && user.patient) {
        setPatientData({
          id: user.patient.id,
          prescriptions: user.patient.prescriptions,
          allergies: user.patient.allergies,
          blood_type: user.patient.blood_type,
          height: user.patient.height,
          weight: user.patient.weight,
          diet: user.patient.diet,
          smoke: user.patient.smoke,
          pregnant: user.patient.pregnant,
          current_conditions: user.patient.current_conditions,
        });
      }
    } else {
      setIsAdmin(true); // if the user is the admin set and store their admin data
      if (user && user.client) {
        setClientData({
          id: user.client.id,
          institute: user.client.institute,
          address: user.client.address,
          role: user.client.role
        });
        setServices(user.client);
      }
    }
  }, [user]);
  
 // retrieve the services from the api 
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

  // return routes to index.js for the different pages and componants of the web-app
  // return specific routes depending on if the user is authenticated or not
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
          <Route path="/profile" element={<Profile authenticated={authenticated} patient={patientData} user={user} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Profile authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/userTitle" element={<UserTitle user={user} />}/>
          <Route path="/clients" element={<Clients user={user} />}/>
          <Route path='clientError' element={<ClientError/>}/>
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
          <Route path="/reset" element={<Reset/>} />
          <Route path="/forgot" element={<ForgotPass/>} />
          <Route path="/client-register" element={<ClientRegister/>} />
          <Route path="/first-login" element={<FirstLogin authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
        </Routes>
      }
      <Footer/>
    </div>
  );
}

export default App