import { Routes, Route } from 'react-router-dom';
import Locations from './components/LocationDetails/Locations';
import CreateLocation from './components/LocationDetails/CreateLocation';
import CreateDevice from './components/LocationDetails/CreateDevice';
import LocationDevice from './components/LocationDetails/LocationDevice';
import DeviceList from './components/LocationDetails/DeviceList';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path='/' element={<Locations />} />
          <Route path='/create-location' element={<CreateLocation />} />
          <Route path="/create-device" element={<CreateDevice />} />
          <Route path="/location/:id" element={<LocationDevice />} />
          <Route path="/device-list" element={<DeviceList />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;