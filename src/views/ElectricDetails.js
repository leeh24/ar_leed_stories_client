import React, {useEffect,useState} from "react";
import Header from "../components/Header";
import axios from 'axios';


export default function ElectricalDetails() {
    const [sensorData, setSensorData] = useState([]);

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    const loaddata = () => {
        alert("Great Shot!");
        const apiData =  axios.get("http://127.0.0.1:5000/sensors", {headers})
        .then (res => {
            console.log(res.data);
            setSensorData(res.data);
        });
    }

          {/* call service endpoint to load data 
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/sensors", {headers})
            .then (res => {
                console.log(res.data);
                setSensorData(res.data);
            });
    },[]);
      }

  */}

    return (
        <>
            <Header />

            <div>
                <h1>Electrical Details</h1>
            </div>

            <div>
                <button onClick={loaddata}>Load Data</button>
            </div>
        </>
    );
}