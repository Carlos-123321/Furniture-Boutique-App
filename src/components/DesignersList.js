import DesignerCard from "./DesignerCard"
import { Container, Row } from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react';
import AddDesigner from "./AddDesigner";

export default function DesignerList(){

    const [designer, setDesigner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [designerOptions, setDesignerOptions] = useState(null);

    const initialized = useRef(false);

    useEffect(() => {    

        if(!initialized.current) {
        initialized.current = true

        getAllDesigners();
        getDesignerOptions();

        }

}, []);

function getAllDesigners(){
(async() =>{
     const response = await fetch("http://localhost:8080/api/v1/designers", {
        method: "GET",
        });

        console.log(response)
        const designer = await response.json();
        console.log(designer);
        setDesigner(designer);
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

    

    function updateDesigner(updatedDesigner){

        console.log("updateFurniture in FurnitureList");
        console.log(updatedDesigner);

        var designerRequestDTO = {

            designerId: updatedDesigner.designerId,
            name: updatedDesigner.name,
            dob: updatedDesigner.dob,
            country:updatedDesigner.country,
            kimageURL:updatedDesigner.kimageURL,
        
            
        }

        console.log("Country is: " + designerRequestDTO.country);
        console.log("designerImage is: " + designerRequestDTO.kimageURL);
        

        fetch(`http://localhost:8080/api/v1/designers/${updatedDesigner.designerId}`,{

        method: 'PUT' ,
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json'


        },

        

        body: JSON.stringify(designerRequestDTO),

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

        getAllDesigners();
        console.log("THIS IS GOING TO PROVE IT is: " + designerRequestDTO.kimageURL);
        

        
    })
    
    }

    async function deleteDesignerHandler (designerId) {

        const response = await fetch(`http://localhost:8080/api/v1/designers/${designerId}`, {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'},
    })
    .then(response => {
        const isJson = response.headers.get('content-type'?.includes('application/json'));

        if(response.status === 204){

            getAllDesigners()
        }
    })

    .catch(function(error){

        console.log("An unknown error has occurred")
        return Promise.reject(error)
    })
    }

    function addDesigner(name, dob, country, kimageURL){


        console.log("DesignersList addDesigner");

        var designerResquestDTO = {

            name: name,
            dob: dob,
            country: country,
            kimageURL: kimageURL,
            
        }

        fetch(`http://localhost:8080/api/v1/designers`,{

        method: 'POST' ,
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json'


        },

        body: JSON.stringify(designerResquestDTO),


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

            
            getAllDesigners();
            
        })
    }



    



    
    
    return (

        <Container fluid>

            <AddDesigner addDesigner={addDesigner}/>
         
            <Row sm={2} lg={4} className='justify-content-evenly'> 
            {designer && designer.map((designer)=>

            <DesignerCard key={designer.designerId} 
            designer={designer}
            updateDesigner={updateDesigner}
            designerOptions={designerOptions}
            onDeleteDesignerHandler={deleteDesignerHandler}
            />
            
            )}
            </Row>
        </Container>


    )


}
