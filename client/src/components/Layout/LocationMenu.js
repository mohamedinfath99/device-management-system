import React from "react";
import { NavLink } from "react-router-dom";


const LocationMenu = () => {
  return (
    <>

      <div className="text-center">

        <div className="list-group">

          <NavLink to="/" className="list-group-item list-group-item-action sidebarr">
            ALL LOCATION DETAILS
          </NavLink>

          <NavLink to="/create-location" className="list-group-item list-group-item-action sidebarr"  >
            CREATE NEW LOCATION
          </NavLink>

          <NavLink to="/create-device" className="list-group-item list-group-item-action sidebarr" >
            CREATE NEW DEVICE
          </NavLink>

          <NavLink to="/device-list" className="list-group-item list-group-item-action sidebarr" >
            ALL DEVICE LIST
          </NavLink>

        </div>

      </div>

    </>

  );
};

export default LocationMenu;
