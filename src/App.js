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
import Logout from './componants/logout';

 // Main App function - calls all componants and routes for the app 
function App({ component: Component, isLoggedIn, ...rest }) {

// declare variables
const [bookings, setBooking] = useState([]);
const [authenticated, setAuthenticated] = useState(false);
const [update,setUpdated] = useState(0);
const handleUpdate = () => {setUpdated(update+1)}
    
// retrieve appointments from API
  const database = "http://localhost:1337/api/appointments?populate=*";
  useEffect( () => {
    fetch(database)
    .then((response) => response.json())
    .then((json) => {setBooking(json.data)})
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
                  <Route path="/" element={<HomePage bookings={bookings}/>} />
                  <Route path="/appointment" element={<Appointment/>} />
                  <Route path="/services" element={<ServicesPage/>} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login 
                                  authenticated={authenticated}
                                  handleAuthenticated={setAuthenticated}
                                  handleUpdate={handleUpdate}/>} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </div>
            </div>
    );
}

export default App