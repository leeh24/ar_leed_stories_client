import React, {useEffect,useState} from "react";
import Header from "../components/Header";
import waterBackground from "../images/waterBackground.jpg";

export default function WaterDetails() {
    return (
        <>
            <Header />
            <body style={{ backgroundImage:`url(${waterBackground})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", height:"700px"}}>
                <div>
                    <h1 style={{textAlign:"center"}}>Water Usage</h1>
                </div>
            </body>
            
        </>
    );
}