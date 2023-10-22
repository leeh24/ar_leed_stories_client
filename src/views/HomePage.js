import React from "react";
import Header from "../components/Header";
import buildImg from "../images/University-Portland-Shiley-Marcos-Center.jpg";

export default function HomePage() {
    return (
        <>
            <Header />

            <div className="building-img">
                <img src={buildImg} />
            </div>
        </>
    );
}