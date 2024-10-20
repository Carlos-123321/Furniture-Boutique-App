import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import FurnitureCard from "./FurnitureCard"
import { Container, Row } from "react-bootstrap"


export default function DesignerFurnitureList(){

    const{state}= useLocation();
    const[furniture,setFurniture]=useState(null);
    const[isLoading, setIsLoading]= useState(true);

    useEffect(()=>{
        (async()=>{
            const response =await fetch(`http://localhost:8080/api/v1/designers/${state.designerId}/furniture`,{
                method:"GET"
            });
            const result= await response.json()
            const furniture = result.furniture
            setFurniture(furniture)
            setIsLoading(false)
    })();
},[]);



if (isLoading){
    return<div><h1>Loading...</h1></div>
}

    return(
        <Container fluid className='p-4'>
        <Row sm={2} lg={4} className='justify-content-evenly'>
            {furniture.map((furniture)=>
             <FurnitureCard key={furniture.furnitureId} furniture={furniture}/>
            )}
            </Row>
    </Container>
    )
}