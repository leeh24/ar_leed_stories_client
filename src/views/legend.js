import React from 'react';

const Legend = () => {
    return (
        <div className="legend">
            <h3 style={{ color: 'white', textShadow: '1px 1px 2px black' }}>Temperature</h3>
            <h3 style={{ color: 'white', textShadow: '1px 1px 2px black' }}>Legend</h3>
            <ul>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(51, 153, 255, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 61°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(102, 180, 204, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 62°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(102, 234, 204, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 65°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(153, 255, 153, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 73°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(170, 255, 170, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 76°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(153, 204, 153, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 79°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(102, 204, 102, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 83°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(255, 204, 153, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 85°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(255, 204, 102, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}> > 85°F</span>
                </li>
            </ul>
        </div>
    );
};

export default Legend;
