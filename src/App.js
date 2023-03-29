import './index.css';
import NavBar from './componants/nav';
import HomePage from './pages/home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Main App function - calls all componants and routes for the app 
function App() {

// declare variables
    const [bookings, setBooking] = useState([]);

// retrieve appointments from API
  const database = "http://localhost:1337/api/appointments?populate=*";

  useEffect( () => {
    fetch(database)
    .then(
        (response) => response.json()
    )
    .then(
         (json) => {
            setBooking(json.data);
            console.log(json.data)
        }
    )
    .catch((err) => {
        console.log(err.message);
    });
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
                </Routes>
              </div>   
            </div>
    );
}

export default App