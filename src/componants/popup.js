import React, { useEffect } from 'react';
import { MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import { Collapse } from 'react-bootstrap';
import { useState } from 'react';
import {Card} from 'react-bootstrap';

/**
 * popup componant
 * 
 * componant to be called and display a popup with relevant appointment data
 * 
 * @author Mehtab Gill
 */

function Popup(props) {

  // open and visable states for the popup
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [services, setServices] = useState([])

  useEffect(() => {

  },[]);

  // handle when the popup is open and visable
  const showDetails = () => {
    setVisible(!visible);
    setOpen(!open);
    setServices(props.clients.attributes.services.data);
  }

  const allServices = services.map((value) =>
    <MDBCard key={value.id} className="mb-4 profile">
      <MDBCardBody>
        <Card.Title>{value.attributes.title}</Card.Title>
        <hr/>
          {value.attributes.desc}
      </MDBCardBody>
    </MDBCard>
  )
  // return the popup data
  return (
    <div>
        <button 
            className='patientButton themeButton' aria-controls="example-collapse-text"
            aria-expanded={open} onClick={showDetails}>Show Services
        </button>
      <Collapse in={open}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol sm="true">
                 {allServices}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Collapse>
    </div>
  );
}

export default Popup;
