import React, {useEffect,useState} from "react";
import Header from "../components/Header";
import axios from 'axios';

import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export default function WaterDetails() {

    const [waterData, setWaterData] = useState([]);
    const [error, setError] = useState(null);
    
    function loadData(useDummyData) {
        if (useDummyData) {
            const dummyData = [3, 6, 9, 2, 4, 8, 1];
            setWaterData(dummyData);
        } else {
            axios.get(`http://localhost:8080/weeklywaterusage`)
                .then (res => {
                    console.log(res.data);
                    setWaterData(res.data.waterUsage);
                    setError(null);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
            });
        }
    }

    useEffect(() => {
        loadData(false);
    }, []);

    const barData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'test',
                //data: [3, 6, 9, 2, 4, 8, 1],
                data: waterData,
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }

    const barOptions = {
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }

    const lineData = {
        labels: ['Mon, Tue, Wed, Thu, Fri, Sat, Sun'],
        datasets: [
            {
                label: 'test',
                data: [3, 6, 9],
                backgroundColor: 'blue',
                borderColor: 'black',
                pointBorderColor: 'blue'
            }
        ]
    }

    const lineOptions = {

    }

    return (
        <>
            <Header />
            <body>
                <div className="waterInfo">
                    <h2 style = {{textAlign:"center"}}>Water Usage</h2>
                    <div>
                        Insert information here.
                    </div>
                </div>

                <br></br>
                <br></br>
                <div className ="waterData">
                    <div className = "waterDataGraph">
                    <Bar
                        data={barData}
                        options={barOptions}
                    ></Bar>
                    </div>
                </div>

            </body>
            
        </>
    );
}