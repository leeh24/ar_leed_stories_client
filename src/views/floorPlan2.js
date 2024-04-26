import React, { useState, useEffect, useRef } from 'react';
import floor2Photo from "../images/floorPhotos/FLOOR2_FINISHED.png";
import axios from 'axios';



const FloorPlan2 = () => {
  const [roomData, setRoomData] = useState({
    SH252: { currentIndex: 0, coordinates: { x: 23.75, y: 21, width: 15, height: 17.2 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    SH253: { currentIndex: 0, coordinates: { x: 50.35, y: 21, width: 22.1, height: 18.9 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'},
    SH254: { currentIndex: 0, coordinates: { x: 31, y: 38.45, width: 10.6, height: 16.1 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH255: { currentIndex: 0, coordinates: { x: 50.4, y: 40, width: 7.5, height: 8.7 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH256: { currentIndex: 0, coordinates: { x: 50.4, y: 49, width: 7.4, height: 8.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH257: { currentIndex: 0, coordinates: { x: 58.2, y: 40, width: 7.5, height: 17.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH258: { currentIndex: 0, coordinates: { x: 65.8, y: 40, width: 6.7, height: 17.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%))' },
    SH259: { currentIndex: 0, coordinates: { x: 34.9, y: 60.7, width: 6.5, height: 8.5 }, clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)' },
    SH260: { currentIndex: 0, coordinates: { x: 19.6, y: 70.4, width: 6.5, height: 21.3 }, clipPath: 'polygon(1% 3%, 82% 0%, 98% 97%, 16% 99%)' },
    SH261: { currentIndex: 0, coordinates: { x: 19.6, y: 70.4, width: 6.5, height: 21.3 }, clipPath: 'polygon(1% 3%, 82% 0%, 98% 97%, 16% 99%)' }
  });

  const [roomTempData, setRoomTempData] = useState({
    SH252: { temperature: [82, 79, 89, 85, 63, 68, 71, 80, 66, 64, 87, 74]},
    SH253: { temperature: [61, 86, 70, 77, 81, 62, 65, 83, 69, 75, 88, 72]},
    SH254: { temperature: [80, 82, 66, 84, 67, 71, 78, 63, 89, 60, 86, 73]},
    SH255: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79]},
    SH256: { temperature: [62, 81, 83, 67, 70, 75, 85, 77, 63, 68, 84, 73]},
    SH257: { temperature: [89, 64, 66, 61, 82, 78, 87, 70, 79, 83, 85, 69]},
    SH258: { temperature: [72, 68, 63, 82, 77, 87, 80, 65, 61, 89, 84, 70]},
    SH259: { temperature: [85, 83, 67, 61, 63, 76, 74, 80, 69, 62, 78, 89]},
    SH260: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79]},
    SH261: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79]}
  });

  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadRoomTemperatureDataOverDay(false);
    
      
  }, []);

  function loadRoomTemperatureDataOverDay(useDummyData) {
    if (useDummyData) {
        var dummyData = {
          SH252: { temperature: [82, 79, 89, 85, 63, 68, 71, 80, 66, 64, 87, 74]},
          SH253: { temperature: [61, 86, 70, 77, 81, 62, 65, 83, 69, 75, 88, 72]},
          SH254: { temperature: [80, 82, 66, 84, 67, 71, 78, 63, 89, 60, 86, 73]},
          SH255: { temperature: [87, 62, 84, 69, 76, 81, 70, 65, 89, 83, 88, 79]},
          SH256: { temperature: [62, 81, 83, 67, 70, 75, 85, 77, 63, 68, 84, 73]},
          SH257: { temperature: [89, 64, 66, 61, 82, 78, 87, 70, 79, 83, 85, 69]},
          SH258: { temperature: [72, 68, 63, 82, 77, 87, 80, 65, 61, 89, 84, 70]},
          SH259: { temperature: [85, 83, 67, 61, 63, 76, 74, 80, 69, 62, 78, 89]},
          SH260: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79]},
          SH261: { temperature: [63, 70, 89, 75, 82, 84, 71, 66, 61, 87, 68, 79]}
        };
        console.log(dummyData);
        setRoomTempData(dummyData);
    } else {
        const url = "http://localhost:8080/floorTemperature/2";
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
    } 
    else {
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
            <div style={overlayTextStyleRoom}>Room {room}</div>
            <div style={overlayTextStyleTemp}>{getRoomColor(room, data.currentIndex).temperatureText}</div>
          </div>
        ))}
        <div //empty rooms
            key="blank"
            className="room-overlay"
            style={{
                position: 'absolute',
                left: `${(39 / 100) * imageDimensions.width}px`,
                top: `${(13.9 / 100) * imageDimensions.width}px`,
                width: `${(11 / 100) * imageDimensions.width}px`,
                height: `${(42 / 100) * imageDimensions.height}px`,
                backgroundColor: 'rgb(255, 255, 255, 1)', // Correct color format
                clipPath: 'polygon(0 0, 0 41%, 23% 41%, 23% 100%, 66% 100%, 66% 88%, 100% 88%, 100% 0)',
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

export default FloorPlan2;
