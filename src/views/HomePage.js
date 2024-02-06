import React from "react";
import Header from "../components/Header";
import buildingVid from "../images/UP Footage.mp4";
import logo from "../images/up_shiley_marcos_logo_trans.png";
import buildingPhoto from "../images/UPImage.png";
import ImageSlider from "../views/imageSlider";
import { SliderData } from "./sliderData";

export default function HomePage() {
    return (
        <>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <Header />
            <body class="bodyTop">
                <div class="home">
                    <div class="frontLogo">
                        <img class="frontLogo" src={logo}></img>
                    </div>
                    <div class="homeVideoContainer">           
                    <ImageSlider slides = {SliderData}/>   
                    </div>
                    <img class = "homePhoto" src = {buildingPhoto}></img>
                </div>
            </body>
                <div class="scroll-test">
                    <div class="bottom-container">
                        <div class="containerTitle>">
                        About Shiley Marcos Center for Design and Innovation
                        </div>
                    </div>  
                    <div class="bottom-container">
                    <div class="containerText">Shiley Marcos Center’s purpose is to provide adaptable lab environments, provide experimental learning opportunities, and establish third hub right here on campus. This building is filled with many systems that promote sustainability and achieve LEED certification. Theses systems include the HVAC system, solar panels, radiant slabs, and more. 
                                </div>
                    </div>
                </div>
            
        </>
    );  
}
