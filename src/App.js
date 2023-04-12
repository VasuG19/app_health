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

// Main App function - calls all componants and routes for the app 
function App() {

// declare variables
const [data, setData] = useState([]);
const [authenticated, setAuthenticated] = useState(false);

// retrieve appointments from API
  const database = "http://localhost:1337/api/appointments?populate=*";
  useEffect( () => {
    fetch(database)
    .then((response) => response.json())
    .then((json) => {setData(json.data); console.log(json.data)})
    .catch((err) => {console.log(err.message)});
}, []);

// return routes to index.js for the different pages of the web-app while calling relevant functions 
  return (
    <div className="App">
      <div className='nav'>
          <NavBar />
      </div>
      <div className='content'>     
        <Routes>
          <Route path="/" element={<HomePage data={data}/>} />
          <Route path="/appointment" element={<Appointment/>} />
          <Route path="/services" element={<ServicesPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App