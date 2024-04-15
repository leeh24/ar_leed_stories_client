import React from 'react';

const Legend = () => {
    return (
        <div className="legend">
            <h3 style={{ color: 'white', textShadow: '1px 1px 2px black' }}>Temperature</h3>
            <h3 style={{ color: 'white', textShadow: '1px 1px 2px black' }}>Legend</h3>
            <ul>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(193, 214, 237, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 64°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(146, 184, 225, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 66°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(107, 156, 204, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 68°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(102, 204, 102, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}> 68-74°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(255, 178, 44, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 76°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(252, 102, 32, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}>≤ 78°F</span>
                </li>
                <li>
                    <span className="legend-color" style={{ backgroundColor: 'rgba(255, 58, 32, 0.7)', width: '30px', height: '20px', display: 'inline-block', marginRight: '5px' }}></span>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black' }}> > 78°F</span>
                </li>
            </ul>
        </div>
    );
};

export default Legend;
