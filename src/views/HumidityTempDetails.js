import React, {useEffect,useState} from "react";
import Header from "../components/Header";




import { CircularProgressbar } from 'react-circular-progressbar';


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const TemperatureHumidityDisplay = () => {
  // Initialize state for temperature and humidity with dummy values
  const [temperature, setTemperature] = useState(25); // Dummy temperature value in Celsius
  const [humidity, setHumidity] = useState(60); // Dummy humidity value in percentage

  useEffect(() => {
    // Simulate updating temperature and humidity every 5 seconds
    const intervalId = setInterval(() => {
      // Generate random dummy values for temperature and humidity
      const newTemperature = Math.floor(Math.random() * 50); // Random value between 0 and 50
      const newHumidity = Math.floor(Math.random() * 100); // Random value between 0 and 100

      setTemperature(newTemperature);
      setHumidity(newHumidity);
    }, 5000);

    
    return () => clearInterval(intervalId);
  }, []);

  // Define data for the pie chart
 

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
  <div className="temperature-humidity-container">
    <h1>Temperature and Humidity</h1>
    <div className="temperature">
      <p>Temperature: {temperature} Degrees Celcius</p>
    </div>
    <div className="humidity">
      <p>Humidity: {humidity}%</p>
      
      

      <BarBounds valueStart={0} valueEnd={humidity}>
      {(value) => (
        <CircularProgressbar
          value={value}
          
          circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
          styles={{
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
            
          }}
          strokeWidth={10}
        />
      )}
    </BarBounds>

      
    </div>
  </div>
    );
};





export default function HumidityTempDetails() {
    return (
        <>
            <Header />

            <div>
            <TemperatureHumidityDisplay />
            </div>
             <div className="floorButtonContainer">
                    <button className="floorButton">Room 1</button>
                    <br></br>
                    <button className="floorButton">Room 2</button>
                    <br></br>
                    <button className="floorButton">Room 3</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
        </>
    );
}
