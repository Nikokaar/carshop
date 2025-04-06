import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ICellEditorRendererParams, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import { Button } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";





ModuleRegistry.registerModules([AllCommunityModule]);


const BASE_URL = 'https://car-rest-service-carshop.2.rahtiapp.fi'

export type TCarData = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
    _links: {
        self: {
            href: string;
        }
    }
};

export type TCar = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
};

function CarList() {
    const [cars, setCars] = useState<TCarData[]>([]);

    const [columnDefs] = useState<ColDef<TCarData>[]>([
        { field: "brand" },
        { field: "model" },
        { field: "color" }, 
        { field: "fuel" }, 
        { field: "modelYear", headerName: "Year" }, 
        { field: "price" }, 
        {
            cellRenderer: (params: ICellRendererParams<TCarData>) =>
                <EditCar
                    currentCar={params.data as TCarData}
                    updateCar={updateCar}

            />
        }, 
        { field: "_links.self.href",
            headerName: "",
            cellRenderer: (params: ICellEditorRendererParams) => {
            return <Button color="secondary" onClick={() => handleDelete(params.value)}>Delete</Button>
        }  
        }
    ])

    const handleDelete = (url: string) => {
        if (window.confirm("Do you want to delete a car?")) {
            deleteCar(url);
        }

    }
    
    const fetchCars = () => {
        fetch(`${BASE_URL}/cars`)
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.error(error));
    }

    const deleteCar = (url: string) => {
        const options = {
            method: "DELETE"
        };

        fetch(url, options)
            .then(() => fetchCars())
            .catch(error => console.log(error));    
    }

    const addCar = (car: TCar) => {
        const options = {
            method: "POST",
            headers: {
            'Content-Type' : 'application/json',
            },
            body: JSON.stringify(car)
        };

        fetch(`${BASE_URL}/cars`, options)
        .then(() => fetchCars())
        .catch(error => console.error(error))
    }

    const updateCar = (car: TCar, url: string) => {
        const options = {
            method: "PUT",
            headers: {
            'Content-Type' : 'application/json',
            },
            body: JSON.stringify(car)
        };

        fetch(url, options)
        .then(() => fetchCars())
        .catch(error => console.error(error))
    }

    useEffect(fetchCars, []);
    
    return(
        <>
        <AddCar addCar={addCar} />
        <div style={{ height: 800, width: "90vw"}}>
            <AgGridReact<TCarData>
            rowData={cars}
            columnDefs={columnDefs}
            />

        </div>
        </>
    )
}

export default CarList;