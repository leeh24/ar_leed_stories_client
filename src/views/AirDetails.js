import React, {useEffect,useState} from "react";
import Header from "../components/Header";

export default function AirDetails() {
    return (
        <>
            <Header />
            <body>
                <div>
                    <h1 style={{textAlign:"center"}}>Indoor Air Quality</h1>
                </div>

                <br></br>
                <br></br>

                <div className="airInfo">
                    <h3>About the Shiley-Marcos Center Indoor Air Quality</h3>
                    Insert information here.
                </div>

            </body>
           
        </>
    );
}