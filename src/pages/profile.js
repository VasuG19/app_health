import React, { useEffect } from 'react';
import { useState } from 'react';
import { MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage} from 'mdb-react-ui-kit';
import EditProfile from '../componants/edit';
import { useNavigate } from "react-router-dom";

/**
 * Profile Page 
 * 
 * profile page displays all of the user info or 
 * redicects the admin to the admin page
 * 
 * @author Mehtab Gill
 */

const Profile = (props) => {

  //declare variables
  const [patient, setPatientData]  = useState([]);
  const [isEditing, setIsEditing]  = useState(false); // check whether or not the page is in edit mode

  // function to log out the current user
  const handleSignOut = () => {
    props.handleAuthenticated(false)
    localStorage.removeItem('token')
    nav("/login");
  }

  // if the user is a patient, store and set the patient data
  const nav = useNavigate();
  useEffect(() => {
  if (!props.user ||props.user.title!== 'client') {
    nav("/profile");
    setPatientData({
      id: props.patient.id,
      prescriptions: props.patient.prescriptions,
      allergies: props.patient.allergies,
      blood_type: props.patient.blood_type,
      height: props.patient.height,
      weight: props.patient.weight,
      phone: props.patient.phone,
      birthday: props.patient.birthday,
      address: props.patient.address,
      diet: props.patient.diet,
      smoke: props.patient.smoke,
      pregnant: props.patient.pregnant,
      current_conditions: props.patient.current_conditions,
    });
  } else { // or if the user is a client, redirect the user to the admin page
    nav("/admin");
  }
  },[nav, props.user, props.patient]);

  // calculate the users BMI using the height and weight properties
  const bmi = (props.patient.weight / props.patient.height)^2

 // display the profile page componants and the edit page when the edit button is selected 
  return (
    <div>
      {isEditing && 
        <EditProfile
          username={props.user.username}
          email={props.user.email}
          first_name={props.user.first_name}
          last_name={props.user.last_name}
          prescriptions={patient.prescriptions}
          allergies={patient.allergies}
          blood_type={patient.blood_type}
          height={patient.height}
          weight={patient.weight}
          phone={props.user.phone}
          birthday={props.user.birthday}
          address={props.user.address}
          diet={patient.diet}
          smoke={patient.smoke}
          pregnant={patient.pregnant}
          user={props.user}
          id={patient.id}
          current_conditions={patient.current_conditions}
          onProfileUpdate={""}
          onClose={() => setIsEditing(false)}
        />
      }
      {!isEditing &&
      <MDBContainer className="py-3 content">
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
                <div className='profileButton'><button className=" themeButton logout" type="button" value="Sign out" onClick={handleSignOut}>Sign out</button></div>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0 profile">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Height(ft)</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.patient.height}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Weight(KG)</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.patient.weight}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Blood Type</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.patient.blood_type}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Diet</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.patient.diet}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Pregnant</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.patient.pregnant}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Smoke</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.patient.smoke}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>BMI</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{bmi}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4 profile">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{props.user.first_name} {props.user.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{props.user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">+44 {props.user.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Birthday</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{props.user.birthday}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{props.user.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="4">
                <MDBCard className="mb-4 mb-md-0 profile">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="textTheme me-1">Prescriptions</span></MDBCardText>
                    <MDBCardText className="text-muted">{props.patient.prescriptions}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="4">
                <MDBCard className="mb-4 mb-md-0 profile">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="textTheme me-1">Conditions</span></MDBCardText>
                    <MDBCardText className="text-muted">{props.patient.current_conditions}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="4">
                <MDBCard className="mb-4 mb-md-0 profile">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="textTheme me-1">Allergies</span></MDBCardText>
                    <MDBCardText className="text-muted">{props.patient.allergies}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

          </MDBCol>

        </MDBRow>
      </MDBContainer>
      }
    </div>
  );
};

export default Profile