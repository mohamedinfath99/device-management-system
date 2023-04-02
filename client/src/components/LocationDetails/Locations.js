import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LocationMenu from "../Layout/LocationMenu";
import Layout from "../Layout/Layout";
import '../Styles/Location.css'



const Locations = () => {

  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);


  //---------GET ALL LOCATION DETAILS------------------------>
  const getAllLocation = async () => {
    try {

      const { data } = await axios.get("/api/v1/location/get-location");

      if (data?.success) {
        setLocation(data?.locations);
      }
      console.log(data);

    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Location");

    } 
    finally {
      setLoading(false); 

    }
  };

  useEffect(() => {
    getAllLocation();
  }, []);


  return (
    <Layout title={"HOME PAGE"}>

      <div className="container-fluid m-3 p-3">

        <div className="row">
          <div className="col-md-3">
            <LocationMenu />
          </div>

          <div className="col-md-8 card">
            <div className="heading">
              <h1> ALL LOCATIONS DETAILS</h1>
            </div>


            {loading && (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            )}
            

            {!loading && (
              <>
                <div className="row container">
                  {location.map((c) => (
                    <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                      <div className="card">
                        <Link to={`/location/${c._id}`} className="btn cat-btn">
                          <span className="locationName">{c.name}</span>
                          <h6>view device</h6>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

      </div>

    </Layout>
  );
};

export default Locations;