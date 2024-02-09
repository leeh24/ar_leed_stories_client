import React from "react";
import Header from "../components/Header";
import logo from "../images/up_shiley_marcos_logo_trans.png";
import buildingPhoto from "../images//ShileyPhotos/IMG_4502.png";
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
                    <div class="containerText">
    The Shiley Marcos Center is a state-of-the-art building designed with sustainability and innovation at its core. It features a variety of energy-saving systems, including an advanced HVAC system, solar panels, and radiant slab systems, contributing to its LEED certification.

    But this center is more than just a "green" building. It's a hub for innovation, equipped with maker spaces, computer labs, classrooms, and study areas. These spaces are designed to foster creativity, collaboration, and learning, making the Shiley Marcos Center a leading destination for forward-thinking education.
</div>
                    </div>
                </div>
            
        </>
    );  
}
