import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/up_shiley_marcos_logo_trans.png";
import menuButton from "../images/toggleMenu.png";

export default function Header() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isFadingOut, setFadingOut] = useState(false); // Track fade-out state

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Function to handle navigation with fade-out effect
    const handleNavigation = (path) => {
        setFadingOut(true); // Start fading out
        setTimeout(() => {
            navigate(path); // Navigate after fade-out
        }, 500); // Wait for fade-out transition to complete
    };

    return (
        <>
            <header className={isFadingOut ? 'fade-out' : 'fade-in'}>
                <div className="inner">
                    <div className="logo">
                        <div>
                            <Link to="/">
                                <img src={logo} alt="Logo"></img>
                            </Link>
                        </div>
                    </div>
                    <div className="buttons">
                        <nav>
                            <li><span>
                                <NavLink to="/leed-stories" activeClassName="activeLink" className="navButton">
                                    LEED Stories
                                </NavLink>
                            </span></li>
                            <li><span>
                                <NavLink to="/floor" activeClassName="activeLink" className="navButton" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                                    Humidity/Temperature
                                    {isDropdownOpen && (
                                        <div className="dropdown-menu">
                                            <NavLink to="/floor" activeClassName="activeLink" className="dropdown-item">Floorplan View</NavLink>
                                            <NavLink to="/humidityTemp-details" activeClassName="activeLink" className="dropdown-item">Graph View</NavLink>
                                        </div>
                                    )}
                                </NavLink>
                            </span></li>
                            <li><span>
                                <NavLink to="/air-details" activeClassName="activeLink" className="navButton">
                                    Air Quality
                                </NavLink>
                            </span></li>
                            <li><span>
                                <NavLink to="/solar-details" activeClassName="activeLink" className="navButton">
                                    Electricity/Solar
                                </NavLink>
                            </span></li>
                        </nav>
                    </div>
                </div>
            </header>
            <button className="sidebarButton" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                <img className="menuButtonImage" src={menuButton} alt="Menu Button"></img>
            </button>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <NavLink to="/" activeClassName="activeLink" className="navButton">
                    Home
                </NavLink>
                <NavLink to="/leed-stories" activeClassName="activeLink" className="navButton">
                    LEED Stories
                </NavLink>
                <NavLink to="/humidityTemp-details" activeClassName="activeLink" className="navButton">
                    Humidity/Temperature
                </NavLink>
                <NavLink to="/air-details" activeClassName="activeLink" className="navButton">
                    Air Quality
                </NavLink>
                <NavLink to="/solar-details" activeClassName="activeLink" className="navButton">
                    Electricity/Solar
                </NavLink>
            </div>
        </>
    );
}
