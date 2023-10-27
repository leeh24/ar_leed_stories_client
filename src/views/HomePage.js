import React from "react";
import Header from "../components/Header";
import buildingVid from "../images/UP Footage.mp4";
import logo from "../images/up_shiley_marcos_logo_trans.png";

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
                    <video class="homeVideo" loop autoPlay muted>
                        <source src = {buildingVid} type="video/mp4"/>
                    </video>
                </div>
                <div class="pageBlock"></div>
                </body>
                <div class="scroll-test">
                    <div class="bottom-container">
                        <div class="containerTitle>">
                        About Shiley Marcos Center for Design and Innovation
                        </div>
                    </div>  
                    <div class="bottom-container">
                    <div class="containerText">Shiley Marcos Center’s purpose was to provide adaptable lab environments, create a third hub on campus, and provide experimental learning opportunities. This building is filled with many systems that promote sustainability and achieve LEED certification. The systems include the HVAC, solar panels, radiant slabs, and more. 
                        To visualize how these systems work and promote sustainability, Opsis, Skanska, and the faculty came up with an idea of an AR dashboard, which is similar to the normal dashboard we had here in Shiley school of engineering. Dean Fabien’s vision of this dashboard was for it to be a product “for students by students”. The dashboard would allow students to scan areas and see data from the different sensors and meters, hoping that professors can use this for educational purposes as well. Last year’s group developed an API that can take data from a fake building automation system, and our goal is to build on top of this to take real data from the online systems in the Shiley Marcos Building. 
                        </div>
                    </div>
                </div>
            
        </>
    );  
}
