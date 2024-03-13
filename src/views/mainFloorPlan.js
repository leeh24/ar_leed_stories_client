import React, { useState } from 'react';
import Header from "../components/Header";
import buildingPhoto from "../images/ShileyPhotos/IMG_4502.png";
import ImageSlider2 from "./imageSlider2";
import { SliderData } from "./sliderData";
import FloorPlan1 from "./floorPlan1";
import FloorPlan2 from "./floorPlan2";
import FloorPlan3 from "./floorPlan3";
import FloorPlan4 from "./floorPlan4";
import Legend from './legend';
// Import other floor plan components as needed

const MainFloorPlan = () => {
    const [selectedFloorPlan, setSelectedFloorPlan] = useState(1);

    const renderFloorPlan = () => {
        switch (selectedFloorPlan) {
            case 1:
                return <FloorPlan1 />;
            case 2:
                return <FloorPlan2 />;
            case 3:
                return <FloorPlan3 />;
            case 4:
                return <FloorPlan4 />;
            // Add cases for other floor plans as needed
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className='floorPlanHome'>
                
                {/* Render the selected floor plan */}
                <div className="floor-plan-container" style={{ transition: 'opacity 0.5s', opacity: 1 }}>
                    {renderFloorPlan()}
     
                </div>
                {/* Buttons positioned on the right side */}
                <div style={{ position: 'absolute', top: '30%', right: '20px', textAlign: 'center' }}>
                    {/* Buttons stacked vertically */}
                    <button style={buttonStyle} onClick={() => setSelectedFloorPlan(1)}>Floor Plan 1</button>
                    <br />
                    <button style={buttonStyle} onClick={() => setSelectedFloorPlan(2)}>Floor Plan 2</button>
                    <br />
                    <button style={buttonStyle} onClick={() => setSelectedFloorPlan(3)}>Floor Plan 3</button>
                    <br />
                    <button style={buttonStyle} onClick={() => setSelectedFloorPlan(4)}>Floor Plan 4</button>
                    {/* Add more buttons for other floor plans as needed */}
                    
                    <Legend />
                </div>
            </div>
            <div className="home">
            <div className="homeVideoContainer" >
                    <ImageSlider2 slides={SliderData} style={{ filter: 'blur(30px)'}} />
                </div>
                <img className="homePhoto" src={buildingPhoto} alt="Building" />
            </div>
        </>
    );
};

// Button style object
const buttonStyle = {
    backgroundColor: '#4CAF50', // Green background color
    border: 'none', // No border
    color: 'white', // White text color
    padding: '15px 32px', // Padding
    textAlign: 'center', // Center text
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px', // Font size
    cursor: 'pointer', // Cursor style
    borderRadius: '8px', // Rounded corners
    marginBottom: '10px', // Add margin between buttons
};

export default MainFloorPlan;
