import React, {useEffect, useState} from "react";
import { MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage} from 'mdb-react-ui-kit';
import { Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Admin (props){
    const [patients, setPatients] = useState([]);
    const [patientNo, setPatientsNo] = useState([]);


    const handleSignOut = () => {
        props.handleAuthenticated(false)
        localStorage.removeItem('token')
    }

    const userToken = localStorage.getItem('token');
    const nav = useNavigate()
    useEffect(() => {
        if (!props.user ||props.user.title!== 'Admin') {
            nav("/");
        } else {
            try {
            const getUserData = async () => {
                const response = await axios.get('http://localhost:1337/api/users?populate=*', {
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

            getUserCount()
            getUserData()
        } catch (error) {
            console.error(error);
          }
        }
    },[nav, props.user, userToken]);

    const allPatients = patients && patients.map((value) => (
        <div key={value.id}>
        <MDBCol sm={true}>
            <MDBCard>
                <MDBCardBody>
                {value.username}
                <Link className="patientButton" to={`/Appointment`}>
                    <Button type="submit">View Profile</Button>
                </Link>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
        </div>
        ));

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
                        <MDBCol sm="4">
                            <MDBCardText>Patients</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="8">
                            <MDBCardText className="text-muted">{patientNo}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="5">
                            <MDBCardText>Upcoming Appointments</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="8">
                            <MDBCardText className="text-muted">{props.user.weight}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="5">
                            <MDBCardText>Total Appointments</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="8">
                            <MDBCardText className="text-muted">{props.user.blood_type}</MDBCardText>
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
                        <MDBRow style={{ height: '400px', overflow: 'scroll' }}>
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