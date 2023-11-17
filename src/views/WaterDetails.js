import React, {useEffect,useState} from "react";
import Header from "../components/Header";
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
    const barData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                labels: 'test',
                data: [3, 6, 9, 2, 4, 8, 1],
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }

    const barOptions = {

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
                <div>
                    <h1 style={{textAlign:"center"}}>Water Usage</h1>
                </div>
                <br></br>
                <br></br>

                <div className="waterInfo">
                    <h3>About the Shiley-Marcos Center Water Usage</h3>
                    Insert information here.
                </div>

                <Bar
                        data={barData}
                        options={barOptions}
                    ></Bar>

            </body>
            
        </>
    );
}