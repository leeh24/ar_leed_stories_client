import React, { useState, useEffect, useRef } from 'react';
import floor1Photo from "../images/floorPhotos/FLOOR1_FINISHED.png";
import axios from 'axios';


const FloorPlan1 = () => {
  const [roomData, setRoomData] = useState({
    SH152: { currentIndex: 0, coordinates: { x: 12.05, y: 27.35, width: 11.9, height: 40.9 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    SH153: { currentIndex: 0, coordinates: { x: 24.25, y: 27.35, width: 12.41, height: 40.9 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 34% 80%, 34% 100%, 0% 100%)' },
    SH154: { currentIndex: 0, coordinates: { x: 37, y: 27.35, width: 10, height: 8.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH155: { currentIndex: 0, coordinates: { x: 53.4, y: 27.35, width: 10.9, height: 32.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH156: { currentIndex: 0, coordinates: { x: 65, y: 27.35, width: 23.4, height: 32.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH157: { currentIndex: 0, coordinates: { x: 28.65, y: 60.2, width: 12, height: 8.1 }, clipPath: 'polygon(67% 10%, 100% 9%, 100% 67%, 100% 100%, 0 100%, 0 0, 67% 0)'},
    SH158: { currentIndex: 0, coordinates: { x: 47.2, y: 60.4, width: 6, height: 13.1}, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}
  });

  const [roomTempData, setRoomTempData] = useState({
    SH152: { temperature: [72, 71, 77, 63, 75, 82, 67, 80, 66, 64, 89, 69]},
    SH153: { temperature: [70, 78, 66, 85, 68, 61, 76, 87, 73, 62, 89, 81]},
    SH154: { temperature: [68, 82, 72, 69, 63, 67, 74, 80, 88, 64, 77, 90]},
    SH155: { temperature: [73, 83, 68, 79, 61, 65, 87, 81, 70, 89, 62, 84]},
    SH156: { temperature: [71, 76, 88, 63, 82, 71, 69, 85, 67, 80, 62, 89]},
    SH157: { temperature: [66, 80, 85, 63, 70, 82, 88, 61, 73, 78, 89, 67]},
    SH158: { temperature: [83, 77, 86, 68, 90, 71, 83, 65, 79, 64, 62, 84]}
  });

  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadRoomTemperatureDataOverDay(true);
    
      
  }, []);

  function loadRoomTemperatureDataOverDay(useDummyData) {
    if (useDummyData) {
        var dummyData = {
          SH152: { temperature: [72, 71, 77, 63, 75, 82, 67, 80, 66, 64, 89, 69]},
          SH153: { temperature: [70, 78, 66, 85, 68, 61, 76, 87, 73, 62, 89, 81]},
          SH154: { temperature: [68, 82, 72, 69, 63, 67, 74, 80, 88, 64, 77, 90]},
          SH155: { temperature: [73, 83, 68, 79, 61, 65, 87, 81, 70, 89, 62, 84]},
          SH156: { temperature: [71, 76, 88, 63, 82, 71, 69, 85, 67, 80, 62, 89]},
          SH157: { temperature: [69, 80, 85, 63, 70, 82, 88, 61, 73, 78, 89, 67]},
          SH158: { temperature: [83, 77, 86, 68, 90, 71, 83, 65, 79, 64, 62, 84]}
        };
        console.log(dummyData);
        setRoomTempData(dummyData);
    } else {
        const url = "http://localhost:8080/floorTemperature/1";
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

  const floorplanRef = useRef(null); // Reference to the floorplan image

  
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
    }, 9000);

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
  
    if (temperature === null || temperature === undefined || temperature == -1) {
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
      transition: 'background-color 1.2s ease', // Smooth transition
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
            
            <div style={overlayTextStyleRoom}>Room {room}</div>
            <div style={overlayTextStyleTemp}>{getRoomColor(room, data.currentIndex).temperatureText}</div>
          </div>
        ))}
                <div //empty rooms
            key="blank"
            className="room-overlay"
            style={{
                position: 'absolute',
                left: `${(37 / 100) * imageDimensions.width}px`,
                top: `${(18.3 / 100) * imageDimensions.width}px`,
                width: `${(16 / 100) * imageDimensions.width}px`,
                height: `${(41 / 100) * imageDimensions.height}px`,
                backgroundColor: 'rgb(255, 255, 255, 1)', // Correct color format
                clipPath: 'polygon(64% 0, 64% 23%, 0 23%, 0 81%, 26% 81%, 26% 100%, 61% 100%, 61% 80%, 100% 80%, 100% 0)',
                border: '2px solid black', // Add border to the overlay
            }}
        >

          </div>
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

export default FloorPlan1;
