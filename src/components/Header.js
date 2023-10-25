import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/up_shiley_marcos_logo.jpg";

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <div className="App-header">
                <div className="building-name">
                    <Link to="/">
                        <img src={logo}></img>
                    </Link> 
                </div>
                <div className="menu-container">
                    <div className="menu-bar">
                        <a href="/leed-stories">
                            <button class="navButton Camera">Use Camera</button>
                        </a>

                        <a href="/leed-stories">
                            <button class="navButton">LEED Stories</button>
                        </a>

                        <a href="/electric-details">
                            <button class="navButton">Electricity</button>
                        </a>

                        <a href="/electric-details">
                            <button class="navButton">Humidity/Temp</button>
                        </a>

                        <a href="/electric-details">
                            <button class="navButton">Water</button>
                        </a>

                        <a href="/electric-details">
                            <button class="navButton">Air Quality</button>
                        </a>

                        <a href="/electric-details">
                            <button class="navButton">Solar</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}