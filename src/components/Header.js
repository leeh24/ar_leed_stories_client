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
                        <div className="menu-item">
                            <Link to="/leed-stories">LEED Stories</Link>
                        </div>
                        <div className="menu-item">
                            <Link to="/electric-details">Electrical Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}