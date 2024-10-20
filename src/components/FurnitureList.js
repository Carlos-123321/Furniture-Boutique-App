import FurnitureCard from "./FurnitureCard"
import { Container, Row } from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react';
import AddFurniture from "./AddFurniture";

export default function FurnitureList(){

    const [furniture, setFurniture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [designerOptions, setDesignerOptions] = useState(null);

    const initialized = useRef(false);

    useEffect(() => {    

        if(!initialized.current) {
        initialized.current = true

        getAllFurniture();
        getDesignerOptions();

        }

}, []);

function getAllFurniture(){
(async() =>{
     const response = await fetch("http://localhost:8080/api/v1/furniture", {
        method: "GET",
        });

        console.log(response)
        const furniture = await response.json();
        console.log(furniture);
        setFurniture(furniture);
        setIsLoading(false);
    })();
}

function getDesignerOptions() {


    (async () => {
        const response = await fetch("http://localhost:8080/api/v1/designers", {
          method: "GET",
        });
        console.log(response);
        const designers = await response.json();
        console.log(designers);
        setDesignerOptions(designers);
      })();
}

    if (isLoading){

        return<div><h1>Loading...</h1></div>
    }

    function addFurniture(name, price, material, imageURL, designerId){


        console.log("FurnitureList addFurniture");

        var furnitureResquestDTO = {

            name: name,
            price: price,
            material: material,
            imageURL: imageURL,
            designerId: designerId,
           

        }

        fetch(`http://localhost:8080/api/v1/furniture`,{

        method: 'POST' ,
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json'


        },

        body: JSON.stringify(furnitureResquestDTO),


        }).then(async (response) => {

            const isJson = response.headers
            .get('content-type')
            ?.includes('application/json');
            const data = isJson && (await response.json());
            console.log("data is: " + data.title)

            if(!response.ok){

                const error = (data && data.message) ||
                response.status;
                console.log("post error ocurred");
                return Promise.reject(error);
            }

            getAllFurniture();

            
        })
    

    }

    

    function updateFurniture(updatedFurniture){

        console.log("updateFurniture in FurnitureList");
        console.log(updatedFurniture);

        var furnitureRequestDTO = {

            name: updatedFurniture.name,
            price: updatedFurniture.price,
            material:updatedFurniture.material,
            imageURL:updatedFurniture.imageURL,
            designerId: updatedFurniture.designer.designerId,
            
        }

        fetch(`http://localhost:8080/api/v1/furniture/${updatedFurniture.furnitureId}`,{

        method: 'PUT' ,
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json'


        },

        body: JSON.stringify(furnitureRequestDTO),

    }).then(async (response) => {

        const isJson = response.headers
        .get('content-type')
        ?.includes('application/json');
        const data = isJson && (await response.json());
        console.log("data is: " + data.title)

        if(!response.ok){

            const error = (data && data.message) ||
            response.status;
            console.log("post error ocurred");
            return Promise.reject(error);
        }

        getAllFurniture();

        
    })
    
    }


    async function deleteFurnitureHandler (furnitureId) {

        const response = await fetch(`http://localhost:8080/api/v1/furniture/${furnitureId}`, {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'},
    })
    .then(response => {
        const isJson = response.headers.get('content-type'?.includes('application/json'));

        if(response.status === 204){

            getAllFurniture()
        }
    })

    .catch(function(error){

        console.log("An unknown error has occurred")
        return Promise.reject(error)
    })
    }


    return (

        <Container fluid>

            <AddFurniture addFurniture={addFurniture} designerOptions={designerOptions}/>
            
            <Row sm={2} lg={4} className='justify-content-evenly'> 
            {furniture && furniture.map((furniture)=>

            <FurnitureCard key={furniture.furnitureId} 
            furniture={furniture}
            updateFurniture={updateFurniture}
            designerOptions={designerOptions}
            onDeleteFurnitureHandler={deleteFurnitureHandler}/>
            
            )}
            </Row>
        </Container>


    )


}
