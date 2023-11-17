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
import bgImage from "../images/bg.png";

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
    /* const barData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'test',
            data: [3, 6, 9],
            data: [
                { id: 'Mon', value:
                    {
                        2022: { consumed: 100, generated: 200 },
                        2023: { consumed: 290, generated: 350 }
                    }
                },
                { id: 'Tue', value:
                    {
                        2022: { consumed: 160, generated: 170 },
                        2023: { consumed: 340, generated: 350 }
                    }
                },
                { id: 'Wed', value:
                    {
                        2022: { consumed: 320, generated: 500 },
                        2023: { consumed: 230, generated: 350 }
                    }
                },
                { id: 'Thu', value:
                    {
                        2022: { consumed: 190, generated: 275 },
                        2023: { consumed: 500, generated: 500 }
                    }
                },
                { id: 'Fri', value:
                    {
                        2022: { consumed: 400, generated: 485 },
                        2023: { consumed: 290, generated: 400 }
                    }
                },
                { id: 'Sat', value:
                    {
                        2022: { consumed: 395, generated: 525 },
                        2023: { consumed: 230, generated: 310 }
                    }
                },
                { id: 'Sun', value:
                    {
                        2022: { consumed: 460, generated: 540 },
                        2023: { consumed: 600, generated: 700 }
                    }
                }
            ],
            backgroundColor: 'aqua',
            borderColor: 'black',
            borderWidth: 1,
        }]
    } 

    const barConfig = {
        type: 'bar',
        barData,
        options: {
            parsing: {
                xAxisKey: 'id',
                yAxisKey: 'value.2022.consumed'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    } */

    /* const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

    } */

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sample Data',
                data: [65, 59, 80, 81, 56, 55, 40],
                /*data: [
                    { id: 'Mon', value:
                        {
                            2022: { consumed: 100, generated: 200 },
                            2023: { consumed: 290, generated: 350 }
                        }
                    },
                    { id: 'Tue', value:
                        {
                            2022: { consumed: 160, generated: 170 },
                            2023: { consumed: 340, generated: 350 }
                        }
                    },
                    { id: 'Wed', value:
                        {
                            2022: { consumed: 320, generated: 500 },
                            2023: { consumed: 230, generated: 350 }
                        }
                    },
                    { id: 'Thu', value:
                        {
                            2022: { consumed: 190, generated: 275 },
                            2023: { consumed: 500, generated: 500 }
                        }
                    },
                    { id: 'Fri', value:
                        {
                            2022: { consumed: 400, generated: 485 },
                            2023: { consumed: 290, generated: 400 }
                        }
                    },
                    { id: 'Sat', value:
                        {
                            2022: { consumed: 395, generated: 525 },
                            2023: { consumed: 230, generated: 310 }
                        }
                    },
                    { id: 'Sun', value:
                        {
                            2022: { consumed: 460, generated: 540 },
                            2023: { consumed: 600, generated: 700 }
                        }
                    }
                ], */
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const [graphType, setGraphType] = useState('bar'); // initial graph

    const handleGraphChange = (e) => {
        console.log(e.target.value);
        setGraphType(e.target.value);
    }

    const renderGraph = () => {
        switch (graphType) {
            case "bar":
                return <Bar data={chartData} />;
            case "line":
                return <Line data={chartData} />;
            default:
                return <Bar data={chartData} />;
        }
    }


    const [chartType, setChartType] = useState('doughnut'); // initial chart

    const handleChartChange = (e) => {
        console.log(e.target.value);
        setChartType(e.target.value);
    };

    const renderChart = () => {
        switch (chartType) {
            case "doughnut":
                return <Doughnut data={chartData} />;
            case "pie":
                return <Pie data={chartData} />;
            default:
                return <Doughnut data={chartData} />;
        }
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
                        <option value="daily">Today</option>
                        <option value="weekly">This week</option>
                        <option value="monthly">This month</option>
                        <option value="yearly">This year</option>
                    </select>

                    <select id="dataType">
                        <option value="consumed">Energy Consumed</option>
                        <option value="generated">Energy Generated</option>
                    </select>

                    <select value={graphType} onChange={handleGraphChange}>
                        <option value="bar">Bar Graph</option>
                        <option value="line">Line Graph</option>
                    </select>

                    <select value={chartType} onChange={handleChartChange}>
                        <option value="doughnut">Doughnut Chart</option>
                        <option value="pie">Pie Chart</option>
                    </select>

                    {renderGraph()}
                    {renderChart()}
                </div>
            </body>
        </>
    );
}