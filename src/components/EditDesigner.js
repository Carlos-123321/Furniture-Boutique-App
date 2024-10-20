import { useState, useMemo} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import _ from "lodash";
import './Buttons.css'
import './EditDesigner.css'
import countryList from "react-select-country-list";


export default function EditDesigner(props) {

  const {designer, updateDesigner, designerOptions} = props;

  const [show, setShow] = useState(false);

  const countries = useMemo(() => countryList().getData(), [])


  const [name, setDesignerName] = useState(designer.name);
  const [dob, setDob] = useState(designer.dob);
  const [country, setCountry] = useState(designer.country);
  const [kimageURL, setKimageURL] = useState(designer.kimageURL);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {

    console.log("hello from EditDesigner");
    event.preventDefault(); 
    console.log(event);
    //console.log("Name is: " + name);
    //console.log("Material is: " + material);
    //console.log("Price is: " + price);
    //console.log("Designer is: " + designerName);
    console.log("Name is: " + name)
    console.log("DesignerImage is: " + kimageURL);


    updateDesigner({

        designerId: designer.designerId, 
        name: name,
        dob: dob, 
        country: country, 
        kimageURL: kimageURL,
        });




    handleClose();
    
  }

  return (
    <>
      <Button className="editButton" onClick={handleShow}>
        Edit Designer
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      
        <Modal.Header closeButton>
          <Modal.Title className="mb-3">Edit Designer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-content wood-background">
          <Form id="editmodal" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label >Name</Form.Label>
              <Form.Control value={name} 
                            required 
                            type="text" 
                            onChange={(e) => {
                              setDesignerName(e.target.value)
                            }}/>

            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formGridDoB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control 
                value={dob}
                type="date"
                required
                max={new Intl.DateTimeFormat('en-CA').format(new Date())}
                onChange={(e) => {
                    setDob(e.target.value)
                  }}
                
                />
              </Form.Group>

           

           

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select value={country}
                onChange={(e) => {
                    
                  setCountry(e.target.value)
                }}>
                  <option value="">Choose...</option>
                  {countries.map((country, i) => {
                    return (
                      <option key={i} value={country.label}>
                        {country.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              
            </Row>

            
            <Form.Group className="mb-3" controlId="formGridDesignerImage">
              <Form.Label>Designer Image</Form.Label>
              <Form.Control
                value={kimageURL}
                type="url"
                onChange={(e) => {
                    
                  setKimageURL(e.target.value)
                }}
              />
            </Form.Group>

          </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="closeButton" onClick={handleClose}>
            Close
          </Button>
          <Button form="editmodal" className="updateButton" type="submit">
            Update
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  );
}