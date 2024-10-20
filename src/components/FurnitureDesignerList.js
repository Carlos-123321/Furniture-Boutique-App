import { useLocation } from "react-router-dom";
import DesignerCard from "./DesignerCard"
import { Container, Row } from 'react-bootstrap'

export default function FurnitureDesignerList(){

    const { state } = useLocation();

    return(
    
        <Container fluid className="p-4">
            
        <Row sm={2} lg={4} > 
    
        <DesignerCard designer={state.designer}/>
        
        
        </Row>
    </Container>

    
    );



}