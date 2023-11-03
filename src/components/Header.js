import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/up_shiley_marcos_logo.jpg";
import menuButton from "../images/toggleMenu.png";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="App-header">
                <div className="building-name">
                    <Link to="/">
                        <img src={logo}></img>
                    </Link> 
                </div>
                {/* Desktop Menu */}
                <div className="menu-container">
                    <div className="menu-bar">
                        <NavLink to="/leed-stories" activeClassName="activeLink" className="navButton">
                            LEED Stories
                        </NavLink>
                        <NavLink to="/electric-details" activeClassName="activeLink" className="navButton">
                            Electricity
                        </NavLink>
                        <NavLink to="/humidityTemp-details" activeClassName="activeLink" className="navButton">
                            Humidity/Temperature
                        </NavLink>
                        <NavLink to="/water-details" activeClassName="activeLink" className="navButton">
                            Water
                        </NavLink>
                        <NavLink to="/air-details" activeClassName="activeLink" className="navButton">
                            Air Quality
                        </NavLink>
                        <NavLink to="/solar-details" activeClassName="activeLink" className="navButton">
                            Solar
                        </NavLink>
                    </div>
                </div>
            </div>

                    {/* Mobile Menu */}
                    <button className="sidebarButton" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <img className="menuButtonImage" src={menuButton}></img>
                    </button>
                    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                        <NavLink to="/leed-stories" activeClassName="activeLink" className="navButton">
                            LEED Stories
                        </NavLink>
                        <NavLink to="/electric-details" activeClassName="activeLink" className="navButton">
                            Electricity
                        </NavLink>
                        <NavLink to="/humidityTemp-details" activeClassName="activeLink" className="navButton">
                            Humidity/Temperature
                        </NavLink>
                        <NavLink to="/water-details" activeClassName="activeLink" className="navButton">
                            Water
                        </NavLink>
                        <NavLink to="/air-details" activeClassName="activeLink" className="navButton">
                            Air Quality
                        </NavLink>
                        <NavLink to="/solar-details" activeClassName="activeLink" className="navButton">
                            Solar
                        </NavLink>
                        

            </div>
        </>
    );
}