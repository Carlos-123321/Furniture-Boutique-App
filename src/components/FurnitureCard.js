import {Card, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import EditFurniture from './EditFurniture';
import './Buttons.css'
import './FurnitureCard.css'


export default function FurnitureCard(props){

    const {furniture, updateFurniture, designerOptions, onDeleteFurnitureHandler} = props;

    const onDelete = () => {

        onDeleteFurnitureHandler(furniture.furnitureId)
    }

  


    return(

        
        <div className='p-3' type="button">

        <Card className="card">
        <LinkContainer to="/furnituredesigner" state={furniture}>
            <Card.Img className="card-image" src={furniture.imageURL}/>
        </LinkContainer>
            <Card.Body>

                <Card.Title>{furniture.name}</Card.Title>

                <Card.Text>
                   <div>
                    <strong>Price: {furniture.price} $</strong> 
                    </div>
                    <div>
                    <strong>Material: </strong> {furniture.material}
                    </div>
                </Card.Text>

                {window.location.pathname === "/furniture" &&


                <>


                <EditFurniture furniture = {furniture} updateFurniture={updateFurniture}

                designerOptions ={designerOptions}/>

                <Button className="deleteButton" onClick={onDelete}>Delete</Button>

                </>
            }
            </Card.Body>



        </Card>

        </div>
    
    )
}