import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import "@google/model-viewer/dist/model-viewer";

export default function LEEDStories() {
    const [isOpen, setIsOpen] = useState([false, false, false]);
    const [isVisible, setIsVisible] = useState([false, false, false]);
    const contentRefs = useRef([]);
    const buttonRefs = useRef([]);

const toggleOpen = (index) => {
    if (isOpen[index]) {
        setIsOpen(prev => {
            const copy = [...prev];
            copy[index] = false;
            return copy;
        });
        setTimeout(() => {
            setIsVisible(prev => {
                const copy = [...prev];
                copy[index] = false;
                return copy;
            });
        }, 300); // The same duration as your transition
    } else {
        setIsVisible(prev => {
            const copy = [...prev];
            copy[index] = true;
            return copy;
        });
        setTimeout(() => {
            setIsOpen(prev => {
                const copy = [...prev];
                copy[index] = true;
                return copy;
            });
        }, 10); // A short delay to ensure that isVisible is set before isOpen
    }
 
    
};

useEffect(() => {
    isOpen.forEach((open, index) => {
        if (open && contentRefs.current[index]) {
            contentRefs.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    });
}, [isOpen]);

    return (
        <>
            <Header />
                <body>
                    <div className="row">
                    <div id="card">
                        
                    <model-viewer src="./model/solar.glb"
                  poster="./model/Solar_Panel.png"
                  shadow-intensity="1"
                  camera-controls
                  auto-rotate ar>
                <div className="annotation">Fun Fact: These are the first solar panels built on campus!</div>
                </model-viewer>

                <section class="attribution">
                    <span>
                        <h1>Solar Panels</h1>
                        <button ref={(el) => buttonRefs.current[1] = el} type="button" className="collapsible" onClick={() => toggleOpen(1)}>{isOpen[1] ? 'Collapse Text' : 'Expand for more info'}</button>
                        <div ref={(el) => contentRefs.current[1] = el} className={`content ${isOpen[1] ? 'open' : ''}`}>
                        <p><strong>Reduction in Energy Use and Carbon Emission</strong>s - 80% less energy demand and 509 tons fewer CO2 operational emissions each year than an average similar building in the US.</p>
                        <ol>
                        <li data-list="ordered">1. 43.6kW solar panel array provide (first solar panels on campus!) will provide ~24% of the building's electrical supply over a year, and 15% of the total energy including gas.</li>
                        <li data-list="ordered">2. Efficient mechanical systems including a radiant hydronic floor delivering heating and cooling. Radiant systems are also more comfortable &nbsp;and healthier for the occupants than one that uses forced-air.</li>
                        <li data-list="ordered">3. "Free heating" is transferred from waste heat from the propulsion lab equipment. "Free cooling" is transferred from the cool irrigation water in the summer to the radiant system.</li>
                        </ol>
                        </div>
                    </span>
                    </section>  

                </div>
                <div id="card">
                        
                    <model-viewer src="./model/coal.glb"
                  poster="./model/Coal_deposit.png"
                  shadow-intensity="1"
                  camera-controls
                  auto-rotate ar>
                <div class="annotation">Fun Fact: UP achieved a 42% reduction in carbon emissions</div>
                </model-viewer>
                <section class="attribution">
                    <span>
                        <h1>Carbon Emission</h1>
                        <button ref={(el) => buttonRefs.current[2] = el} type="button" className="collapsible" onClick={() => toggleOpen(2)}>{isOpen[2] ? 'Collapse Text' : 'Expand for more info'}</button>                        <div ref={(el) => contentRefs.current[2] = el} className={`content ${isOpen[2] ? 'open' : ''}`}>
                        <p><strong> Reduction in Embodied Carbon* (*</strong>the greenhouse gas emissions generated from the manufacturing, transportation, installation, maintenance, and disposal of building materials).</p>
                        <ol>
                        <li data-list="ordered">1.Through the strategic reuse of the concrete foundation, retaining walls and concrete structural elements of the existing building, University of Portland achieved a 42% reduction in embodied carbon emissions compared to if the Innovation Center had been completely New Construction. The amount of materials being used for construction was reduced tremendously. The cement in concrete is responsible for 8% of planet-warming CO2 emissions globally.</li>
                        <li data-list="ordered">2.Cross-laminated timber structural roof panels are a regional material, made from trees grown in local forests. Trees sequester CO2 from the atmosphere as they grow, which means the embodied carbon of products made from timber is significantly lower than those made from cement.</li>
                        </ol>
                        </div>
                    </span>
                    </section>   
                </div>
            </div>
            
            <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
            
            </body>
        </>
    );
}