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

// Main App function - calls all componants and routes for the app 
function App() {

// declare variables
const [data, setData] = useState([]);
const [authenticated, setAuthenticated] = useState(false);
const [user, setUser] = useState({});

// retrieve appointments from API
const userToken = localStorage.getItem('token');

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
    };
    getUserData();
  }
}, [userToken]);

// return routes to index.js for the different pages of the web-app while calling relevant functions 
  return (
    <div className="App">
       <div className='nav'>
            <NavBar />
        </div>
      { authenticated &&
        <div className='content'>     
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/appointment" element={<Appointment data={data}/>} />
            <Route path="/services" element={<ServicesPage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login authenticated={authenticated} user={user} handleAuthenticated={setAuthenticated}/>} />
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
    </div>
  );
}

export default App