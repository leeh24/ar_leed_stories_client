import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    PointElement,
    ArcElement, 
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import Header from "../components/Header";
// import bgImage from "../images/bg.png";

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export default function SolarDetails() {
    const barData = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: 'test',
            data: [3, 6, 9],
            backgroundColor: 'aqua',
            borderColor: 'black',
            borderWidth: 1,
        }]
    }

    const barOptions = {

    }

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: 'test',
            data: [3, 6, 9],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua'
        }]
    }

    const lineOptions = {

    }

    const doughnutData = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgroundColor: ['black', 'red'],
            borderColor: ['black', 'red'],
        }]
    }

    const doughnutOptions = {

    }

    const pieData = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgroundColor: ['black', 'red'],
            borderColor: ['black', 'red'],
        }]
    }

    const pieOptions = {

    }

    return (
        <>
            <Header />
            <body /* style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity:1}} */>
                <h1 style={{ textAlign: "center", color: "#7752b4" }}>Solar Energy Usage</h1>

                <br></br>

                <div className="solarInfo">
                    <h3>About the Shiley-Marcos Center Solar Farm</h3>
                    Insert information here.
                </div>

                <br></br>

                <div className="solarData">
                    <h3>Analyze solar energy data</h3>

                    <select id="dataTimeInterval">
                        <option>Today</option>
                        <option>This week</option>
                        <option>This month</option>
                        <option>This year</option>
                    </select>

                    <select id="dataType">
                        <option>Energy Consumed</option>
                        <option>Energy Generated</option>
                    </select>

                    <select id="graphType">
                        <option>Bar Graph</option>
                        <option>Line Graph</option>
                    </select>

                    <select id="chartType">
                        <option>Doughnut Chart</option>
                        <option>Pie Chart</option>
                    </select>

                    <Bar
                        data={barData}
                        options={barOptions}
                    ></Bar>

                    <Line
                        data={lineData}
                        options={lineOptions}
                    ></Line>

                    <Doughnut
                        data={doughnutData}
                        options={doughnutOptions}
                    ></Doughnut>

                    <Pie
                        data={pieData}
                        options={pieOptions}
                    ></Pie>
                </div>

            </body>
        </>
    );
}
