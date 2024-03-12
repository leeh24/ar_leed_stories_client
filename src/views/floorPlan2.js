import React, { useState, useEffect, useRef } from 'react';
import floor2Photo from "../images/floorPhotos/FLOOR2_FINISHED.png";




const FloorPlan2 = () => {
  const [roomData, setRoomData] = useState({
    SH252: { temperature: [82, 79, 89, 85, 63, 68, 71, 80, 66, 64, 87, 74] , currentIndex: 0, coordinates: { x: 23.75, y: 21, width: 15, height: 17.2 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    SH253: { temperature: [61, 86, 70, 77, 81, 62, 65, 83, 69, 75, 88, 72], currentIndex: 0, coordinates: { x: 50.35, y: 21, width: 22.1, height: 18.9 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'},
    SH254: { temperature: [80, 82, 66, 84, 67, 71, 78, 63, 89, 60, 86, 73], currentIndex: 0, coordinates: { x: 31, y: 38.45, width: 10.6, height: 16.1 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH255: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79], currentIndex: 0, coordinates: { x: 50.4, y: 40, width: 7.5, height: 8.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH256: { temperature: [62, 81, 83, 67, 70, 75, 85, 77, 63, 68, 84, 73], currentIndex: 0, coordinates: { x: 50.4, y: 49, width: 7.4, height: 8.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH257: { temperature: [89, 64, 66, 61, 82, 78, 87, 70, 79, 83, 85, 69], currentIndex: 0, coordinates: { x: 58.2, y: 40, width: 7.5, height: 17.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH258: { temperature: [72, 68, 63, 82, 77, 87, 80, 65, 61, 89, 84, 70], currentIndex: 0, coordinates: { x: 65.8, y: 40, width: 6.7, height: 17.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH259: { temperature: [85, 83, 67, 61, 63, 76, 74, 80, 69, 62, 78, 89], currentIndex: 0, coordinates: { x: 34.9, y: 60.7, width: 6.5, height: 8.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)' },
    SH260: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79], currentIndex: 0, coordinates: { x: 19.6, y: 70.4, width: 6.5, height: 21.3 }, clipPath: 'polygon(1% 3%, 82% 0%, 98% 97%, 16% 99%)' },
    SH261: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79], currentIndex: 0, coordinates: { x: 19.6, y: 70.4, width: 6.5, height: 21.3 }, clipPath: 'polygon(1% 3%, 82% 0%, 98% 97%, 16% 99%)' }
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const floorplanRef = useRef(null);
  

  useEffect(() => {
    const updateImageDimensions = () => {
      if (floorplanRef.current) {
        setImageDimensions({
          width: floorplanRef.current.offsetWidth,
          height: floorplanRef.current.offsetHeight
        });
      }
    };
    updateImageDimensions();

    const handleResize = () => {
      updateImageDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTemperature();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateTemperature = () => {
    setRoomData(prevRoomData => {
      const updatedRoomData = { ...prevRoomData };
      Object.keys(updatedRoomData).forEach(room => {
        const roomInfo = updatedRoomData[room];
        const { temperature, currentIndex } = roomInfo;
        const nextIndex = (currentIndex + 1) % temperature.length;
        updatedRoomData[room] = { ...roomInfo, currentIndex: nextIndex };
      });
      return updatedRoomData;
    });
  };

  const handleAreaClick = (roomNumber) => {
    setSelectedRoom(roomNumber);
  };

  const getRoomColor = (roomNumber, temperatureIndex) => {
    const room = roomData[roomNumber];
    const temperature = room.temperature[temperatureIndex];
  
    let backgroundColor;
    let temperatureText;
  
    if (temperature === null || temperature === undefined) {
      backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Default color (white with 0.7 transparency)
      temperatureText = 'No data';
    } else {
      temperatureText = `${temperature}°F`;
      if (temperature <= 45) {
        backgroundColor = 'rgba(51, 153, 255, 0.7)'; // Light Blue with 0.7 transparency
      } else if (temperature <= 67) {
        backgroundColor = 'rgba(102, 204, 255, 0.7)'; // Sky Blue with 0.7 transparency
      } else if (temperature <= 76) {
        backgroundColor = 'rgba(153, 255, 153, 0.7)';
      } else if (temperature <= 85) {
        backgroundColor = 'rgba(255, 153, 51, 0.7)'; // Orange with 0.7 transparency
      } else {
        backgroundColor = 'rgba(255, 102, 102, 0.7)'; // Light Red with 0.7 transparency
      }
    }
  
    return {
      backgroundColor,
      transition: 'background-color 0.9s ease', // Smooth transition
      temperatureText,
    };
  };

  const getTemperatureFontSize = () => {
    // Define a base font size
    const baseFontSize = 15; // in pixels
    // Calculate the percentage of the floorplan width to the window width
    const widthPercentage = (imageDimensions.width / window.innerWidth) * 100;
    // Calculate the font size as a percentage of the base font size
    return `${(baseFontSize * widthPercentage) / 100}px`;
  };
  
  
  const overlayTextStyleRoom = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '1px 1px 2px black', // Add stroke to room text
  };
  
  const overlayTextStyleTemp = {
    position: 'absolute',
    top: '73%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: getTemperatureFontSize(), // Dynamically calculate font size
    textShadow: '1px 1px 2px black', // Add stroke to temperature text
  };
  
  
  return (
    <>
      <div style={{ position: 'relative' }}>
        <img ref={floorplanRef} src={floor2Photo} alt="Floorplan" className="floorplan-image" onClick={handleAreaClick} />
        <div className="overlay">
        {Object.entries(roomData).map(([room, data]) => (
          <div
            key={room}
            className="room-overlay"
            style={{
              position: 'absolute',
              left: `${(data.coordinates.x / 100) * imageDimensions.width}px`,
              top: `${(data.coordinates.y / 100) * imageDimensions.height}px`,
              width: `${(data.coordinates.width / 100) * imageDimensions.width}px`,
              height: `${(data.coordinates.height / 100) * imageDimensions.height}px`,
              ...getRoomColor(room, data.currentIndex),
              clipPath: data.clipPath, // Apply the clip-path dynamically
              border: '2px solid black', // Add border to the overlay
            }}
            onClick={() => handleAreaClick(room)} // Add back the click handler here
          >
            <div style={overlayTextStyleRoom}>Room: {room}</div>
            <div style={overlayTextStyleTemp}>{getRoomColor(room, data.currentIndex).temperatureText}</div>
          </div>
        ))}
        </div>
      </div>
      {selectedRoom && (
        <div className="popup">
          <h2>Room {selectedRoom}</h2>
          <p>Temperature: {roomData[selectedRoom].temperature[roomData[selectedRoom].currentIndex]}°F</p>
          <button onClick={() => setSelectedRoom(null)}>Close</button>
        </div>
      )}
      
    </>
  );
};

export default FloorPlan2;