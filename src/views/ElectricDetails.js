import React, {useEffect,useState} from "react";
import Header from "../components/Header";
import lightBackground from "../images/lightBackground.jpg"

export default function ElectricalDetails() {

    return (
        <>
            <Header />
            <body style={{ backgroundImage:`url(${lightBackground})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", height:"700px",}}>
                <div >
                    <h1 style={{textAlign:"center"}}>Electrical Usage</h1>
                </div>
                <br></br>
                <br></br>
                
                    <div className="wattsCounter">
                        70 Kilowatts
                    </div>
               
                <br></br>
                <div className="electricInfo">
                        Information on how the building uses the electricity, and its systems.
                </div>
                
                <div className="floorButtonContainer">
                    <button className="floorButton">Floor 1</button>
                    <br></br>
                    <button className="floorButton">Floor 2</button>
                    <br></br>
                    <button className="floorButton">Floor 3</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </body>

           
        </>
    );
}