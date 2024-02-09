import React, {useEffect,useState} from "react";
import axios from 'axios';
import Header from "../components/Header";
import { Line } from 'react-chartjs-2';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, Title);


export default function AirQualityDetails() {

    // Initialize state for air quality with dummy values
    const [temperature, setTemperature] = useState(25); // Dummy temperature value in Celsius
    const [humidity, setHumidity] = useState(60); // Dummy humidity value in percentage
    const [temperatureDataOverDay, setTemperatureDataOverDay] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      loadTemperatureDataOverDay(false);

        // Simulate updating air quality every 5 seconds
        const intervalId = setInterval(() => {
            // Generate random dummy values for air quality
            const newHumidity = Math.floor(Math.random() * 100); // Random value between 0 and 100
            setHumidity(newHumidity);
        }, 5000);
    
        return () => clearInterval(intervalId);
    }, []);


    function loadTemperatureDataOverDay(useDummyData) {
        if (useDummyData) {
            const dummyData = [25, 24, 23, 26, 28, 27, 26, 24, 23, 27, 25, 24,
                    25, 24, 23, 26, 28, 27, 26, 24, 23, 27, 25, 24];
            setTemperatureDataOverDay(dummyData);
        } else {
            axios.get(`http://localhost:8080/airQualityIndex`)
                .then (res => {
                    console.log(res.data);
                    setTemperatureDataOverDay(res.data.temperatureUsage);
                    setError(null);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
            });
        }
    }

    const lineOptions = {
      scales: {
        y:
          {
            min: 0,
            max: 50,
            stepSize: 5,
          },
      },
    };


    //change color based on humidity level
    const calcColor = (percent, start, end) => {
      let a = percent / 100,
          b = (end - start) * a,
          c = b + start;

      // return an CSS hsl color string
      return 'hsl(' + c + ', 100%, 50%)';
    };

    const BarBounds = ({ valueStart, valueEnd, children }) => {
      const [value, setValue] = React.useState(valueStart);
      React.useEffect(() => {
          setValue(valueEnd);
      }, [valueEnd]);

      return children(value);
    };


    return (
        <>
            <Header />
            <div className="temperature-humidity-container">
              <div className="tempInfo">
                    <h2 style = {{textAlign:"center"}}>Air Quality Index</h2>
              </div>
              <div className="temperature-graph-container">              
                <div className="humidity-container">
                  <div className="humidity">
                    <p><b> Air Quality: {humidity} </b></p>
                  </div>
                  
                  <div className="humidity-graph">
                    <BarBounds valueStart={0} valueEnd={humidity}>
                      {
                        (value) => (
                          <CircularProgressbar
                            value={value}
                            circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
                            styles={
                              {
                                trail: {
                                  strokeLinecap: 'butt',
                                  transform: 'rotate(-126deg)',
                                  transformOrigin: 'center center',
                                  stroke: "#808080"
                                },
                                path: {
                                  strokeLinecap: 'butt',
                                  transform: 'rotate(-126deg)',
                                  transformOrigin: 'center center',
                                  stroke: calcColor(value, 0, 120),
                                },
                              }
                            }
                            strokeWidth={10}
                          />
                        )
                      }
                    </BarBounds>
                  </div>
                </div>
              </div>
            </div>
        </>
    );
}
