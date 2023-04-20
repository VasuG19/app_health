import './index.css';
import NavBar from './componants/nav';
import HomePage from './pages/home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Appointment from './pages/appointment';
import ServicesPage from './pages/services';
import Profile from './pages/profile';
import Register from './componants/register';
import Login from './componants/login';
import axios from 'axios';
import Footer from './componants/footer';
import Admin from './pages/admin';
import { useNavigate } from "react-router-dom";

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
        const response = await axios.get('http://localhost:1337/api/users/me?populate=profile', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
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

const nav = useNavigate();

  useEffect(() => {
  if (!user ||user.title!== 'Admin') {
     setIsAdmin(false)
    } else {
      setIsAdmin(true)
    }
  },[nav, user]);

// return routes to index.js for the different pages of the web-app while calling relevant functions 
  return (
    <div className="App">
       <div className='nav'>
          <NavBar authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>
        </div>
      { authenticated &&
        <div className='content'>     
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/appointment" element={<Appointment user={user}/>} />
            <Route path="/services" element={<ServicesPage/>} />
            <Route path="/profile" element={<Profile authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
            <Route path="/admin" element={<Admin user={user} Admin={isAdmin} />} />
          </Routes>
        </div>
      } 
      {!authenticated &&
        <div className='content'>     
        <Routes>
          <Route path="/" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/appointment"element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/services" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/profile" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
        </Routes>
      </div>
      }
      <Footer/>
    </div>
  );
}

export default App