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
                <h1 style={{ textAlign: "center", color: "#7752b4" }}>Consumption of Electricity and Solar Energy</h1>

                <br></br>

                <div className="solarInfo">
                    <h3>How is the Shiley-Marcos building powered?</h3>
                    <p>
                        This is a sentence solely used for filler content.
                    </p>

                    <p>
                        abcdefghijklmnopqrstuvwxyz.
                    </p>

                    <h3>About the Solar Farm at the Shiley-Marcos Center</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend leo a mollis dapibus. Suspendisse 
                        quis urna vel velit scelerisque semper rhoncus ut odio. Maecenas fringilla elit eu dignissim consectetur. Donec 
                        felis ex, consequat sed sagittis non, posuere sit amet nulla. Quisque in suscipit arcu, non fermentum massa. 
                        Donec nec euismod lectus. Maecenas ut massa nulla. Integer auctor dictum metus non finibus. Fusce purus turpis, 
                        placerat et tristique sed, mattis a ipsum. Ut vitae viverra nibh, ac tincidunt ante.
                    </p>
                    
                    <p>
                        Nullam suscipit hendrerit convallis. Praesent magna ex, euismod aliquam sapien et, faucibus porta risus. Praesent 
                        tincidunt et lacus sed sagittis. Sed quis pulvinar dolor. Aenean commodo vel nisl in aliquam. Donec pellentesque, 
                        dolor rhoncus viverra dapibus, urna tortor aliquam arcu, nec tempus augue metus consequat nunc. Sed eu ipsum a tellus 
                        egestas pretium. Maecenas eu turpis eget nisi fermentum egestas quis nec tortor. Proin feugiat sodales lorem et scelerisque. 
                        Suspendisse nibh augue, elementum eget justo sed, rutrum laoreet lectus. In hac habitasse platea dictumst.   
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