import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../components/Header";
import bgImage from "../images/bg.png";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
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
import { SliderData } from "./sliderData";
import ImageSlider2 from "./imageSlider2";
import buildingPhoto from "../images/ShileyPhotos/IMG_4502.png";
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
    const [solarData, setSolarData] = useState({ consumed: [], generated: [] });

    const [distributionData, setDistributionData] = useState([]);
    const [error, setError] = useState(null);

    function loadData(useDummyData) {
        if (useDummyData) {
            const dummyData = {
                consumed: [3, 5, 9, 3, 5, 6, 7],
                generated: [2, 4, 5, 2, 3, 4, 7]
            };
            setSolarData(dummyData);
        } else {
            axios.get(`http://localhost:8080/weeklysolarusage`)
                .then (res => {
                    console.log(res.data);
                    setSolarData(res.data.solarUsage);
                    setError(null);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
            });
        }
    }

    
    function loadDistributionData(testData) {
        if (testData) {
            const testData = [1, 2, 3, 4, 5];
            setDistributionData(testData);
        }
        else {
            axios.get(`http://localhost:8080/weeklypowerdistribution`)
                .then (res => {
                    console.log(res.data);
                    setDistributionData(res.data.powerDistribution);
                    setError(null);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
            });
        }
    }

    useEffect(() => {
        loadData(true);
        loadDistributionData(false);
    }, []);

    const chartData = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'Energy Consumed',
                data: solarData.consumed,
                backgroundColor: 'rgba(75, 0, 130, 0.2)',
                borderColor: 'rgba(75, 0, 130, 1)',
                borderWidth: 1,
            },
            {
                label: 'Energy Generated',
                data: solarData.generated,
                backgroundColor: 'rgba(233, 217, 70, 0.2)',
                borderColor: 'rgba(233, 217, 70, 1)',
                borderWidth: 1,
            }
        ],
    };

    const graphConfig = {
        options: {
            scales: {
                y: {
                    ticks: {
                        color: 'white', // Set color to white
                    }
                },
                x: {
                    ticks: {
                        color: 'white', // Set color to white
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white', // Set color to white
                    }
                },
            
            }, 
        },
    };
    
    const doughnutData = {
        labels: ['HVAC', 'Elevator System', 'IT/Networking', 'Lighting', 'Plug Loads'],
        datasets: [
            {
                data: distributionData,
                backgroundColor: [
                    'rgba(0, 71, 143, 0.2)',
                    'rgba(85, 83, 87, 0.2)',
                    'rgba(75, 0, 130, 0.2)',
                    'rgba(233, 217, 70, 0.2)',
                    'rgba(128, 9, 72, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 71, 143, 1)',
                    'rgba(85, 83, 87, 1)',
                    'rgba(75, 0, 130, 1)',
                    'rgba(233, 217, 70, 1)',
                    'rgba(128, 9, 72, 1)',
                ],
                borderWidth: 1,
                offset: 25,
                spacing: 0,
            },
        ],
    }

    const doughnutConfig = {
    plugins: {
        legend: {
            display: true,
            labels: {
                color: 'white', // Set color to white
            }
        },

    },
    // other configurations...
};

    const [graphType, setGraphType] = useState('bar'); // initial graph

    const handleGraphChange = (e) => {
        console.log(e.target.value);
        setGraphType(e.target.value);
    }

    const renderGraph = () => {
        const chartData = {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [
                {
                    label: 'Energy Consumed',
                    data: solarData.consumed,
                    backgroundColor: 'rgba(75, 0, 130, 0.2)',
                    borderColor: 'rgba(75, 0, 130, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Energy Generated',
                    data: solarData.generated,
                    backgroundColor: 'rgba(233, 217, 70, 0.2)',
                    borderColor: 'rgba(233, 217, 70, 1)',
                    borderWidth: 1,
                }
            ],
        };
    
        switch (graphType) {
            case "bar":
                return <Bar data={chartData} options={graphConfig} />;
            case "line":
                return <Line data={chartData} options={graphConfig} />;
            default:
                return <Bar data={chartData} options={graphConfig} />;
        }
    }


    const [chartType, setChartType] = useState('doughnut'); // initial chart

    const renderChart = () => {
        return <Doughnut data={doughnutData} options={doughnutConfig} backgroundColor={'rgba(255, 0, 0, 0.2)'} />;
    }

    return (
        <>
            <Header />
            <body style={{ color: 'white', textShadow: '1px 1px 2px black', backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundColor: "rgba(255, 255, 255, 0)" }}>
                <h1 style={{ textAlign: "center", color: "#7752b4" }}>Energy Use and Renewables</h1>
                <div className="solarInfo">
                    <h3>About the Solar Array at the Shiley-Marcos Center</h3>
                    <p>
                        The 43.6 kW solar panel array will provide approximately 24% of the building's electrical supply yearly.
                        The array will be the first solar panels on campus, showing the University's commitment to renewable energy
                        and reduced carbon emissions. The solar array was made possible by a generous donatiojn from Darlene Marcos Shiley.
                    </p>          
                </div>

                <br></br>

                <h3>Analyze electricity/solar data</h3>

                <div className="solarSelectData">
                    <select id="dataTimeInterval">
                        <option value="daily">Today</option>
                        <option value="weekly">This week</option>
                        <option value="monthly">This month</option>
                        <option value="yearly">This year</option>
                    </select>

                    <select className="solarSelectGraph" value={graphType} onChange={handleGraphChange}>
                        <option value="bar">Bar Graph</option>
                        <option value="line">Line Graph</option>
                    </select>
                </div>

                <div className="solarDataGraph">
                    {renderGraph()}
                </div>  

                <div className="solarDataChart">
                    {renderChart()}  
                </div> 
                
                
            </body>
            <div className="home">
            <div className="homeVideoContainer" >
                    <ImageSlider2 slides={SliderData} style={{ filter: 'blur(30px)'}} />
                </div>
                <img className="homePhoto" src={buildingPhoto} alt="Building" />
            </div>
        </>
    );
}