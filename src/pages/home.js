import React from 'react';


/**
 * Home Page
 * 
 * function to return home page data with relevant information and images
 * 
 * @author Mehtab Gill
 */

function HomePage(props){


 const bookings = props.bookings.map(
    (value) => 
        <section key={value.id}>
            {value.attributes.Date}
        </section>
    )

    return(

        <div className='home'>
            
            <h1>Welcome to Health+!</h1>                
            
            {bookings}

        </div>
)}

export default HomePage