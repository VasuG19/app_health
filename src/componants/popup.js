import React from 'react';
import { MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function Popup(props) {

  return (
    <div className="popup">
      <div className="popup-content">
      <MDBContainer className="py-5">
        <MDBRow>

          <MDBCol lg="4">
          
            <div className='profileButton'><Button className="logout" type="button" value="Sign out" onClick={props.close}>Close</Button></div>

            <MDBCard className="mb-4 mb-lg-0 profile">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Height</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.user.height}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Weight</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.user.weight}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Blood Type</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.user.blood_type}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Diet</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.user.diet}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Pregnant</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.user.pregnant}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Smoke</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className="text-muted">{props.user.smoke}</MDBCardText>
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
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Prescriptions</span></MDBCardText>
                    <MDBCardText className="text-muted">{props.user.prescriptions}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="4">
                <MDBCard className="mb-4 mb-md-0 profile">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Conditions</span></MDBCardText>
                    <MDBCardText className="text-muted">{props.user.current_conditions}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="4">
                <MDBCard className="mb-4 mb-md-0 profile">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Allergies</span></MDBCardText>
                    <MDBCardText className="text-muted">{props.user.allergies}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

          </MDBCol>

        </MDBRow>
      </MDBContainer>
      </div>
    </div>
  );
}

export default Popup;
