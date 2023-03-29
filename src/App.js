import './index.css';
import NavBar from './componants/nav';
import HomePage from './pages/home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Main App function - calls all componants and routes for the app 
function App() {

// declare variables
    const [authenticated, setAuthenticated] = useState(false);
    const [update,setUpdated] = useState(0);
    const handleUpdate = () => {setUpdated(update+1)}
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);

// retrieve appointments from API
    useEffect( () => {
        const database = "http://localhost:1337/api/appointments?populate=*";
        fetch(database)
        .then(response => response.json())
        .then(json => {
            setBooking(json.data);
            console.log(json.data);
            }
        )
        .catch(err => {
            console.log(err.message);
        });
    }, [update]);

// return routes to index.js for the different pages of the web-app while calling relevant functions 
    return (
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage booking={booking}/>} />
                </Routes>
            </div>
    );
}

export default App