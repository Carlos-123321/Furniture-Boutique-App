import {Card, Button} from 'react-bootstrap'
import './DesignerCard.css'
import { LinkContainer } from 'react-router-bootstrap'
import './Buttons.css'
import EditDesigner from './EditDesigner';


export default function DesignerCard(props){

    const {designer, updateDesigner, designerOptions, onDeleteDesignerHandler} = props;

    const onDelete = () => {

        onDeleteDesignerHandler(designer.designerId)
    }


    return(



<div className='p-3' type="button">
        <Card>
        <LinkContainer to={"/designerfurniture"} state={{ designerId: designer.designerId}}>
            <Card.Img src={designer.kimageURL}/>
            </LinkContainer>
            <Card.Body>
                <Card.Title className='card_title'>{designer.name}</Card.Title>

                <Card.Text>
                    <div>
                <strong>Country: </strong> {designer.country}
                </div>
                <div>
                <strong>Date of Birth: </strong> {designer.dob}
                </div>
                </Card.Text>
                {window.location.pathname === "/designers" &&
                <>


                <EditDesigner designer = {designer} updateDesigner={updateDesigner}
                designerOptions ={designerOptions}/>

                <Button className="deleteButton" onClick={onDelete}>Delete</Button>
                </>
            }

            </Card.Body>



        </Card>
        </div>
        
    )
}