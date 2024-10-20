import { useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import _ from "lodash";
import './Buttons.css'
import './EditFurniture.css'



export default function EditFurniture(props) {

  const {furniture, updateFurniture, designerOptions} = props;

  const [show, setShow] = useState(false);
  


  const [name, setName] = useState(furniture.name);
  const [price, setPrice] = useState(furniture.price);
  const [material, setMaterial] = useState(furniture.material);
  const [imageURL, setImageURL] = useState(furniture.imageURL);
  const [designerName, setDesignerName] = useState(furniture.designer.name);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {

    console.log("hello from add furniture save");
    event.preventDefault(); 
    console.log(event);
    console.log("Name is: " + name);
    console.log("Material is: " + material);
    console.log("Price is: " + price);
    console.log("Designer is: " + designerName);


var designer = designerOptions
.find(designer => designer.name === designerName);



    updateFurniture({
        furnitureId: furniture.furnitureId, 
        name: name,
        price: price, 
        imageURL: imageURL, 
        material: material,
        designer: designer});




    handleClose();
  }

  return (
    <>
      <Button className="editButton" onClick={handleShow}>
        Edit Furniture
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      
        <Modal.Header closeButton>
          <Modal.Title className="mb-3">Edit Furniture</Modal.Title>
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
                              setName(e.target.value)
                            }}/>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control value={price} 
                            required 
                            type="text" 
                            onChange={(e) => {
                              setPrice(e.target.value)
                            }}/>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridMaterial">
              <Form.Label>Material</Form.Label>
              <Form.Control value={material} 
                            required 
                            type="text" 
                            onChange={(e) => {
                              setMaterial(e.target.value)
                            }}/>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridImageURL">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={imageURL}
                type="url"
                onChange={(e) => {
                  setImageURL(e.target.value)
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              

              <Form.Group as={Col} controlId="formGridDesigner">
                <Form.Label>Designer</Form.Label>
                <Form.Select required value={designerName}
                onChange={(e) => {
                  setDesignerName(e.target.value)
                }}>
                  <option value="">Choose...</option>
                  {designerOptions &&
                    designerOptions.map((designer, i) => {
                      return (
                        <option key={i} value={designer.name}>
                          {designer.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
            </Row>
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