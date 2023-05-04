import React, {useEffect, useState} from "react";
import { MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditAdmin from "../componants/editAdmin";
import ServicesPage from "./services";

/**
 * Admin Page 
 * 
 * Retrieves and displays relevant admin data for the admin
 * 
 * @author Mehtab Gill
 */

function Admin (props){
    // States used in the component
    const [patients, setPatients] = useState([]);
    const [upcoming, setUpcoming] = useState({ data: [] });
    const [appointments, setAppointments] = useState({ data: [] });
    const [isEditing, setIsEditing]  = useState(false);

    // Count of upcoming and all appointments
    const numberOfEntries = upcoming.data.length;
    const numberOfApp = appointments.data.length;

    // Get token from local storage and initialize navigate hook
    const userToken = localStorage.getItem('token');
    const nav = useNavigate()

    // Function to handle user sign out
    const handleSignOut = () => {
        props.handleAuthenticated(false)
        localStorage.removeItem('token')
        nav("/login");
    }

    // Use Effect to fetch data on mount and when dependencies change
    useEffect(() => {
        const today = new Date().toISOString();

        // Redirect user to home page if not an admin
        if (!props.user ||props.user.title!== 'client') {
            nav("/");
        } else {
            try {

            const getUserData = async () => {
                // Get patient data
                const response = await axios.get('http://localhost:1337/api/users?filters[title][$ne]=client');
                setPatients(response.data);
            }

            const getUpcoming = async () => {
                // Get upcoming appointments
                const response = await axios.get(`http://localhost:1337/api/appointments?populate=*&filters[start][$gte]=${today}`);
                setUpcoming(response.data);
            }

            const getAppointments = async () => {
                // Get all appointments
                const response = await axios.get(`http://localhost:1337/api/appointments`);
                setAppointments(response.data);
            }

            getUserData()
            getUpcoming()
            getAppointments()

        } catch (error) {
            console.error(error);
          }
        }
    },[nav, props.user, userToken]);

    // Map through patients and create card for each
    const allPatients = patients && patients.map((value) =>  
        <div key={value.id}>
            <MDBCol sm={true}>
                <MDBCard>
                    <MDBCardBody>
                        <ServicesPage clientData={props.clientData}/>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </div>
    );

    // Render admin dashboard
    return(
        <MDBContainer className="py-5 content">
            {isEditing && 
        <EditAdmin
          user={props.user}
          username={props.user.username}
          email={props.user.email}
          institute={props.clientData.institute}
          address={props.clientData.address}
          onProfileUpdate={""}
          onClose={() => setIsEditing(false)}
        />
      }
      {!isEditing &&
            <MDBRow>
                <MDBCol lg="4">
                    <MDBCard className="mb-4 profile">
                        <MDBCardBody className="text-center">
                            <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                            alt="avatar" className="rounded-circle" style={{ width: '150px' }} fluid />
                            <div className='profileButton'><p className="text-muted mb-1">{props.user.username}</p></div>
                            <div className="d-flex justify-content-center mb-2">
                                <div className='profileButton'><button className=" themeButton logout" onClick={() => setIsEditing(true)}>Edit</button></div>  
                                <div className='profileButton'><button className="logout themeButton" type="button" value="Sign out" onClick={handleSignOut}>Sign out</button></div>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mb-4 mb-lg-0 profile">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="5">
                                    <MDBCardText>Institute</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="5">
                                    <MDBCardText className="text-muted">{props.clientData.institute}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="5">
                                    <MDBCardText>Address</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="5">
                                    <MDBCardText className="text-muted">{props.clientData.address}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="8">
                                    <MDBCardText>Upcoming Appointments</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="2">
                                    <MDBCardText className="text-muted">{numberOfEntries}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="8">
                                    <MDBCardText>Total Appointments</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="2">
                                    <MDBCardText className="text-muted">{numberOfApp}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

                <MDBCol lg="8">
                    <MDBCard className="mb-4 profile">
                    <MDBCardBody>
                        <MDBRow>
                        <MDBCol>
                            <MDBCardText> List of Services </MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow style={{ height: '70vh', overflow: 'scroll' }}>
                            {allPatients}
                        </MDBRow>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow>
            }
        </MDBContainer>
    )
}

export default Admin;