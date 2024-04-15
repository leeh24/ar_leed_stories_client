import React, { useState, useEffect, useRef } from 'react';
import floor3Photo from "../images/floorPhotos/FLOOR3_FINISHED.png";
import axios from 'axios';



const FloorPlan3 = () => {
  const [roomData, setRoomData] = useState({
    SH352: { currentIndex: 0, coordinates: { x: 23.6, y: 31.4, width: 4.9, height: 10.4 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    SH353: { currentIndex: 0, coordinates: { x: 23.6, y: 42, width: 4.9, height: 7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'},
    SH354: { currentIndex: 0, coordinates: { x: 23.6, y: 49.2, width: 4.9, height: 5.3 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'},
    SH355: { currentIndex: 0, coordinates: { x: 28.6, y: 31.4, width: 13, height: 23.1 }, clipPath: 'polygon(0% 0%, 81% 0%, 81% 24%, 75% 24%, 75% 64%, 100% 64%, 100% 94%, 45% 94%, 45% 100%, 0 100%)' },
    SH356: { currentIndex: 0, coordinates: { x: 63.8, y: 36.3, width: 8.7, height: 18 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'},
    SH357: { currentIndex: 0, coordinates: { x: 54.4, y: 62, width: 10.1, height: 10 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'},
    SH358: { currentIndex: 0, coordinates: { x: 50.1, y: 31.4, width: 13.6, height: 23.2 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}
  });

  const [roomTempData, setRoomTempData] = useState({
    SH352: { temperature: [61, 86, 70, 77, 81, 62, 65, 83, 69, 75, 88, 72]},
    SH353: { temperature: [85, 83, 67, 61, 63, 76, 74, 80, 69, 62, 78, 89]},
    SH354: { temperature: [62, 81, 83, 67, 70, 75, 85, 77, 63, 68, 84, 73]},
    SH355: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79]},
    SH356: { temperature: [72, 68, 63, 82, 77, 87, 80, 65, 61, 89, 84, 70]},
    SH357: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79]},
    SH358: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79]}
  });

  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadRoomTemperatureDataOverDay(false);
    
      
  }, []);

  function loadRoomTemperatureDataOverDay(useDummyData) {
    if (useDummyData) {
        var dummyData = {
          SH352: { temperature: [61, 86, 70, 77, 81, 62, 65, 83, 69, 75, 88, 72]},
          SH353: { temperature: [85, 83, 67, 61, 63, 76, 74, 80, 69, 62, 78, 89]},
          SH354: { temperature: [62, 81, 83, 67, 70, 75, 85, 77, 63, 68, 84, 73]},
          SH355: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79]},
          SH356: { temperature: [72, 68, 63, 82, 77, 87, 80, 65, 61, 89, 84, 70]},
          SH357: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79]},
          SH358: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79]}
        };
        console.log(dummyData);
        setRoomTempData(dummyData);
    } else {
        const url = "http://localhost:8080/floorTemperature/3";
        axios.get(url)
          .then (res => {
              console.log(res.data);
              setRoomTempData(res.data);
              setError(null);
          })
          .catch((err) => {
              console.log(err);
              setError(err);
        });
    }
  } 

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const floorplanRef = useRef(null);
  

  useEffect(() => {
    const updateImageDimensions = () => {
      const currentRef = floorplanRef.current;
      if (currentRef) {
        setImageDimensions({
          width: currentRef.offsetWidth,
          height: currentRef.offsetHeight
        });
      }
    };
  
    const handleResize = () => {
      updateImageDimensions();
    };
  
    window.addEventListener('resize', handleResize);
  
    // Call updateImageDimensions once the image has loaded
    if (floorplanRef.current.complete) {
      updateImageDimensions();
    } else {
      floorplanRef.current.addEventListener('load', updateImageDimensions);
    }
  
    return () => {
      window.removeEventListener('resize', handleResize);
      const currentRef = floorplanRef.current;
      if (currentRef) {
        currentRef.removeEventListener('load', updateImageDimensions);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTemperature();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const updateTemperature = () => {
    setRoomTempData(prevRoomData => {
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
    const room = roomTempData[roomNumber];
    const temperature = room.temperature[temperatureIndex];
  
    let backgroundColor;
    let temperatureText;
  
    if (temperature === null || temperature === undefined) {
      backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Default color (white with 0.7 transparency)
      temperatureText = 'No data';
    } else {
      temperatureText = `${temperature}°F`;
      if (temperature <= 64) {
          backgroundColor = 'rgba(193, 214, 237, 1)'; // Light Blue with 0.7 transparency
      } else if (temperature <= 66) {
          backgroundColor = 'rgba(146, 184, 225, 1)'; // Very light green almost blue like teal with 0.7 transparency
      } else if (temperature <= 68) {
        backgroundColor = 'rgba(107, 156, 204, 1)'; // Very light green almost blue like teal with 0.7 transparency
      }
      else if (temperature <= 74) {
          backgroundColor = 'rgba(102, 204, 102,1)'; // Lightish green with 0.7 transparency
      } else if (temperature <= 76) {
          backgroundColor = 'rgba(255, 178, 44, 1)'; // Light green with 0.7 transparency
      } else if (temperature <= 78) {
          backgroundColor = 'rgba(252, 102, 32, 1)'; // Darker green not too dark with 0.7 transparency
      } else {
          backgroundColor = 'rgba(255, 58, 32, 1)'; // Light orange with 0.7 transparency
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
    const baseFontSize = 20; // in pixels
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
    fontSize: getTemperatureFontSize() * 0.7, // Dynamically calculate font size
    textShadow: '1px 1px 2px black', // Add stroke to room text
    whiteSpace: 'nowrap' // Prevent text from wrapping onto multiple lines
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
        <img ref={floorplanRef} src={floor3Photo} alt="Floorplan" className="floorplan-image" onClick={handleAreaClick} />
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
            <div style={overlayTextStyleRoom}>Room {room}</div>
            <div style={overlayTextStyleTemp}>{getRoomColor(room, data.currentIndex).temperatureText}</div>
          </div>
        ))}
        </div>
      </div>
      {selectedRoom && (
        <div className="popup">
          <h2>Room {selectedRoom}</h2>
          <p>Temperature: {roomTempData[selectedRoom].temperature[roomData[selectedRoom].currentIndex]}°F</p>
          <button onClick={() => setSelectedRoom(null)}>Close</button>
        </div>
      )}
      
    </>
  );
};

export default FloorPlan3;
