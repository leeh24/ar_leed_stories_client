import React from "react";
import Header from "../components/Header";
import buildingVid from "../images/UP Footage.mp4";

export default function HomePage() {
    return (
        <>
            <Header />
            <body>
                <div class="home">
                    <video class="homeVideo" loop autoPlay muted>
                        <source src = {buildingVid} type="video/mp4"/>
                    </video>
                </div>
                <div class="pageBlock"></div>
            </body>
        </>
    );  
}