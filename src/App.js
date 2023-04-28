import './index.css';
import NavBar from './componants/nav';
import HomePage from './pages/home.js';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Appointments from './pages/appointments';
import Timetable from './pages/calendar';
import ServicesPage from './pages/services';
import Profile from './pages/profile';
import Register from './componants/register';
import Login from './componants/login';
import axios from 'axios';
import Footer from './componants/footer';
import Admin from './pages/admin';
import NotFound from './componants/notFound';
import { Container } from 'react-bootstrap';

// Main App function - calls all componants and routes for the app 
function App() {

// declare variables
const [authenticated, setAuthenticated] = useState(false);
const [user, setUser] = useState({});
const [isAdmin, setIsAdmin]  = useState(false);


// validate whether the user is authenticated
const userToken = localStorage.getItem('token');

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
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
  }
}, [userToken]);

const [servicesHome, setServicesHome] = useState([]);

// retrieve the user data from the api
useEffect(() => {
if (localStorage.getItem('token')) {
  const getUserData = async () => {
    fetch(`http://localhost:1337/api/services`)
      .then((response) => response.json())
      .then((json) => {
        // limit the number of services received to 3
        const limitedServices = json.data.slice(0, 3);
        setServicesHome(limitedServices);
      })
      .catch((err) => console.log(err.message));        
  }
  getUserData();
}
}, [userToken]);

  useEffect(() => {
  if (!user ||user.title!== 'Admin') {
     setIsAdmin(false)
    } else {
      setIsAdmin(true)
    }
  },[ user]);

// return routes to index.js for the different pages of the web-app while calling relevant functions 
  return (
    <div className="App">
       <div className='nav'>
          <NavBar authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>
        </div>
      { authenticated &&
        <div>
            <Routes>
              <Route path="/" element={<HomePage user={user} services={servicesHome} />} />
              <Route path='*' element={<NotFound />}/>
              <Route path="/appointments" element={<Appointments user={user}/>} />
              <Route path="/calendar" element={<Timetable user={user}/>} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/profile" element={<Profile authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Profile authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
              <Route path="/admin" element={<Admin authenticated={authenticated} user={user} Admin={isAdmin} handleAuthenticated={setAuthenticated} />} />
            </Routes>
          </div>
      } 
      {!authenticated &&
        <Container className='content'>     
        <Routes>
          <Route path='*' element={<NotFound />}/>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/appointments"element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profile" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/admin" element={<Login authenticated={authenticated} user={user} Admin={isAdmin} handleAuthenticated={setAuthenticated} />} />
        </Routes>
      </Container>
      }
      <Footer/>
    </div>
  );
}

export default App