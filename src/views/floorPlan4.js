import React, { useState, useEffect, useRef } from 'react';
import floor4Photo from "../images/floorPhotos/FLOOR4_FINISHED.png";




const FloorPlan4 = () => {
  const [roomData, setRoomData] = useState({
    SH452: { temperature: [61, 86, 70, 77, 81, 62, 65, 83, 69, 75, 88, 72] , currentIndex: 0, coordinates: { x: 18.5, y: 41.9, width: 15, height: 17.6 }, clipPath: 'polygon(0 0, 7% 100%, 68% 100%, 66% 100%, 66% 72%, 72% 72%, 72% 28%, 100% 28%, 100% 0' },
    SH453: { temperature: [89, 64, 66, 61, 82, 78, 87, 70, 79, 83, 85, 69], currentIndex: 0, coordinates: { x: 49.4, y: 60.5, width: 15, height: 13.4 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}
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
    const baseFontSize = 13; // in pixels
    // Calculate the percentage of the floorplan width to the window width
    const widthPercentage = (imageDimensions.width / window.innerWidth) * 100;
    // Calculate the font size as a percentage of the base font size
    return `${(baseFontSize * widthPercentage) / 100}px`;
  };
  
  
  const overlayTextStyleRoom = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '1px 1px 2px black', // Add stroke to room text
  };
  
  const overlayTextStyleTemp = {
    position: 'absolute',
    top: '77%',
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
        <img ref={floorplanRef} src={floor4Photo} alt="Floorplan" className="floorplan-image" onClick={handleAreaClick} />
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

export default FloorPlan4;
