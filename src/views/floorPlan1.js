import React, { useState, useEffect, useRef } from 'react';
import floor1Photo from "../images/floorPhotos/FLOOR1_FINISHED.png";




const FloorPlan1 = () => {
  const [roomData, setRoomData] = useState({
    SH152: { temperature: [83, 71, 77, 63, 75, 82, 67, 80, 66, 64, 89, 69] , currentIndex: 0, coordinates: { x: 12.05, y: 27.35, width: 11.9, height: 40.9 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    SH153: { temperature: [70, 78, 66, 85, 68, 61, 76, 87, 73, 62, 89, 81], currentIndex: 0, coordinates: { x: 24.25, y: 27.35, width: 12.41, height: 40.9 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 34% 80%, 34% 100%, 0% 100%)' },
    SH154: { temperature: [86, 82, 72, 69, 63, 67, 74, 80, 88, 64, 77, 90], currentIndex: 0, coordinates: { x: 37, y: 27.35, width: 10, height: 8.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH155: { temperature: [74, 83, 68, 79, 61, 65, 87, 81, 70, 89, 62, 84], currentIndex: 0, coordinates: { x: 53.4, y: 27.35, width: 10.9, height: 32.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH156: { temperature: [78, 76, 88, 63, 82, 71, 69, 85, 67, 80, 62, 89], currentIndex: 0, coordinates: { x: 65, y: 27.35, width: 23.4, height: 32.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH157: { temperature: [66, 80, 85, 63, 70, 82, 88, 61, 73, 78, 89, 67], currentIndex: 0, coordinates: { x: 28.65, y: 60.2, width: 12, height: 8.1 }, clipPath: 'polygon(67% 10%, 100% 9%, 100% 67%, 100% 100%, 0 100%, 0 0, 67% 0)'},
    SH158: { temperature: [81, 77, 86, 68, 90, 71, 83, 65, 79, 64, 62, 84], currentIndex: 0, coordinates: { x: 47.2, y: 60.4, width: 6, height: 13.1}, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const floorplanRef = useRef(null); // Reference to the floorplan image

  
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
        <img ref={floorplanRef} src={floor1Photo} alt="Floorplan" className="floorplan-image" onClick={handleAreaClick} />
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

export default FloorPlan1;
