import React from "react";
import '../Styles/CreateLocation.css'


const LocationForm = ({ handleSubmit, value, setValue, address, setAddress, phone, setPhone }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="btn-forn loc-form">

        <div >
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Location"
            value={value}
            onChange={(e) => setValue(e.target.value)} 
          />
        </div>


        <div >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Location address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} 
          />
        </div>

        <div >
          <input
            type="text"
            className="form-control"
            placeholder="Enter location phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>


        <button type="submit" className="btn btn-primary btn-submit">
          Submit
        </button>
        
      </form>
    </>
  );
};

export default LocationForm;