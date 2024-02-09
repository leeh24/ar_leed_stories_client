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
    const [solarData, setSolarData] = useState([]);
    const [error, setError] = useState(null);

    function loadData(useDummyData) {
        if (useDummyData) {
            const dummyData = [3, 6, 9, 2, 4, 8, 1];
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

    useEffect(() => {
        loadData(false);
    }, []);

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sample Data',
                data: solarData,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(255, 127, 0, 0.2)', 
                    'rgba(255, 255, 0, 0.2)', 
                    'rgba(0, 255, 0, 0.2)', 
                    'rgba(0, 0, 255, 0.2)', 
                    'rgba(75, 0, 130, 0.2)', 
                    'rgba(148, 0, 211, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 127, 0, 1)', 
                    'rgba(255, 255, 0, 1)', 
                    'rgba(0, 255, 0, 1)', 
                    'rgba(0, 0, 255, 1)', 
                    'rgba(75, 0, 130, 1)', 
                    'rgba(148, 0, 211, 1)'
                ],
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
                return <Doughnut data={chartData} backgroundColor={'rgba(255, 0, 0, 0.2)'}/>;
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
                <h1 style={{ textAlign: "center", color: "#7752b4" }}>Consumption of Electricity and Solar Energy</h1>

                <br></br>

                <div className="solarInfo">
                    <h3>How is the Shiley-Marcos building powered?</h3>
                    <p>

                    </p>

                    <p>

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
                </div>

                <div className="solarDataGraph">
                    {renderGraph()}
                </div>  

                <div className="solarDataChart">
                    {renderChart()}  
                </div> 
                
            </body>
        </>
    );
}