import React, {useEffect, useState} from "react";
import { MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage} from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../componants/popup";

function Admin (props){
    const [patients, setPatients] = useState([]);
    const [patientNo, setPatientsNo] = useState([]);
    const [upcoming, setUpcoming] = useState({ data: [] });
    const [appointments, setAppointments] = useState({ data: [] });

    const numberOfEntries = upcoming.data.length;
    const numberOfApp = appointments.data.length;

    const handleSignOut = () => {
        props.handleAuthenticated(false)
        localStorage.removeItem('token')
    }

    const userToken = localStorage.getItem('token');
    const nav = useNavigate()

    useEffect(() => {
    const today = new Date().toISOString();

        if (!props.user ||props.user.title!== 'Admin') {
            nav("/");
        } else {
            try {
            const getUserData = async () => {
                const response = await axios.get('http://localhost:1337/api/users?filters[title][$ne]=Admin', {
                headers: { Authorization: `Bearer ${userToken}`,},
                });
                setPatients(response.data);
            }

            const getUserCount = async () => {
                const response = await axios.get('http://localhost:1337/api/users/count', {
                headers: { Authorization: `Bearer ${userToken}`,},
                });
                setPatientsNo(response.data);
            }

            const getUpcoming = async () => {
                const response = await axios.get(`http://localhost:1337/api/appointments?populate=*&filters[start][$gte]=${today}`, {
                headers: { Authorization: `Bearer ${userToken}`,},
                });
                setUpcoming(response.data);
            }

            const getAppointments = async () => {
                const response = await axios.get(`http://localhost:1337/api/appointments`, {
                headers: { Authorization: `Bearer ${userToken}`,},
                });
                setAppointments(response.data);
            }

            getUserCount()
            getUserData()
            getUpcoming()
            getAppointments()

        } catch (error) {
            console.error(error);
          }
        }
    },[nav, props.user, userToken]);


    const allPatients = patients && patients.map(
        (value) =>  
        <div key={value.id}>
            <MDBCol sm={true}>
                <MDBCard>
                    <MDBCardBody>
                        <Popup user={value} />
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </div>
    );

    return(
        <div>
        {props.Admin &&
        <MDBContainer className="py-5">
            <h1><strong>Admin</strong></h1>
            <MDBRow>

                <MDBCol lg="4">
                    <MDBCard className="mb-4 profile">
                        <MDBCardBody className="text-center">
                            <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                            alt="avatar" className="rounded-circle" style={{ width: '150px' }} fluid />
                            <div className='profileButton'><p className="text-muted mb-1">{props.user.username}</p></div>
                            <div className="d-flex justify-content-center mb-2">
                                <div className='profileButton'>
                                    <Button className="logout" type="button" value="Sign out" onClick={handleSignOut}>Sign out</Button>
                                </div>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mb-4 mb-lg-0 profile">
                        <MDBCardBody>
                            <MDBRow>
                            <MDBCol sm="8">
                                <MDBCardText>Patients</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="2">
                                <MDBCardText className="text-muted">{patientNo}</MDBCardText>
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
                            <MDBCardText> List of patients </MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow style={{ height: '405px', overflow: 'scroll' }}>
                            {allPatients}
                        </MDBRow>
                        <hr />
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow>
        </MDBContainer>
        }
      </div>
    )
}

export default Admin;