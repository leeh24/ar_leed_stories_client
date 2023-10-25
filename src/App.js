import logo from './images/University-Portland-Shiley-Marcos-Center.jpg';
import HomePage from './views/HomePage';
import ElectricalDetails from './views/ElectricDetails';
import LEEDStories from './views/LEEDStories';
import Test from './views/Test';
import WaterDetails from './views/WaterDetails';
import HumidityTempDetails from './views/HumidityTempDetails';
import AirDetails from './views/AirDetails';
import SolarDetails from './views/SolarDetails';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<HomePage />}></Route>
          <Route index element={<HomePage />}></Route>
          <Route exact path="/electric-details" element={<ElectricalDetails />}></Route>
          <Route exact path="/leed-stories" element={<LEEDStories />}></Route>
          <Route exact path="/water-details" element={<WaterDetails />}></Route>
          <Route exact path="/humidityTemp-details" element={<HumidityTempDetails />}></Route>
          <Route exact path="/air-details" element={<AirDetails />}></Route>
          <Route exact path="/solar-details" element={<SolarDetails />}></Route>
          <Route exact path="/test-page" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
