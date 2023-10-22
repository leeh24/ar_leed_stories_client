import logo from './images/University-Portland-Shiley-Marcos-Center.jpg';
import HomePage from './views/HomePage';
import ElectricalDetails from './views/ElectricDetails';
import LEEDStories from './views/LEEDStories';
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
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
