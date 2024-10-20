import { Nav, Navbar } from "react-bootstrap"
import Container from 'react-bootstrap/Container'
import { LinkContainer } from "react-router-bootstrap"
import './NavBar.css'

export default function MyNavBar(){

    const links = [

        {
            to: "",
            title: "Home"
        },
        {
            to: "furniture",
            title: "Furniture"
        },
        {
            to: "designers",
            title: "Designers"
        }
    ]



    return(
    <>
    <Navbar style={{ backgroundColor: "#FAEBD7", paddingBottom: '20px'}}>

        <Container>

            <LinkContainer to="/" style={{ cursor: 'pointer'}}>
                <Navbar.Brand className="logo">FQ</Navbar.Brand>
            </LinkContainer>

            <Nav className="me-auto fs-4 mx-auto">

                {links.map((link) => (

                    <LinkContainer to ={`/${link.to}`} key={link.to} className="navbar-link">
                        <Nav.Link>{link.title}</Nav.Link>
                    </LinkContainer>
               ))}      
                
                
            </Nav>
        </Container>
    </Navbar>
    <div style={{ paddingBottom: '60px' }}/>
    </>
    )
}