import React, {useEffect,useState} from "react";
import Header from "../components/Header";
import axios from 'axios';


export default function ElectricalDetails() {
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState(null);



    function loadData() {
        axios.get(`http://localhost:5000/sensors`)
        .then (res => {
            console.log(res.data);
            setSensorData(res.data);
            setError(null);
        })
        .catch((err) => { 
            console.log(err);
            setError(err);
        });
    }
      
    useEffect(() => {
        loadData();
    }, []);

 
    const callLoadData = () => {
        loadData();
    }

    return (
        <>
            <Header />

            <div>
                <h1>Electrical Usage</h1>
            </div>

            <div>
                <button onClick={callLoadData}>Reload Data</button>
            </div>

            <br />
            {
                error != null &&
                    <div className="error-msg">Error loading data: {error.message}</div>
            }

            {
                sensorData.map(sensor => (
                    <div className="data-section">
                        {console.log(sensor)}
                        <div className="data-title">
                            <div>Sensor Name: {sensor.name}</div>
                            <div>Sensor Description: {sensor.description}</div>
                            <div>Room: {sensor.room}</div>
                        </div>
                        <ul>
                        {
                            sensor.data.map(sData => ( 
                                <li>{sData.datetime} : {sData.value}{sData.units}</li>
                            ))
                        }
                        </ul>
                    </div>
                ))
                
            }
           
        </>
    );
}