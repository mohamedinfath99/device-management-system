import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import Layout from '../Layout/Layout';
import LocationMenu from '../Layout/LocationMenu';
import '../Styles/CreateDevice.css'
import { Select } from 'antd';
const { Option } = Select;



function CreateDevice() {

  const [locationList, setLocationList] = useState([]);

  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);


  // ---------GET ALL LOCATION LIST------------>
  const getAllLocation = async () => {
    try {

      const { data } = await axios.get("/api/v1/location/get-location");

      if (data?.success) {
        setLocationList(data?.locations)
      }
      console.log(data);

    }
    catch (error) {
      console.log(error);

    }
    finally {
      setLoading(false);

    }
  }

  useEffect(() => {
    getAllLocation()
  }, [])



  // --------FORM BUTTON - HANDLE CREATE------------>
  const handleCreate = async (e) => {
    e.preventDefault();

    try {

      const deviceDetails = new FormData();

      deviceDetails.append("serialNumber", serialNumber);
      deviceDetails.append("type", type);
      deviceDetails.append("location", location);
      deviceDetails.append("image", image);
      deviceDetails.append("status", status);

      const { data } = await axios.post("/api/v1/device/create-device", deviceDetails);

      if (data?.success) {
        toast.success("Device Created Successfully");
        window.location.reload();
      }
    }
    catch (error) {
      console.log(error);

      if (error.response.status === 422) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }

    }
  };

  return (
    <Layout title={"CREATE NEW DEVICE"}>

      <div className="container-fluid m-3 p-3">

        <div className="row">
          <div className="col-md-3">
            <LocationMenu />
          </div>

          <div className="col-md-8 card ">
            <div className='heading'>
              <h1>CREATE NEW DEVICE</h1>
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
                <div className='card-details'>
                  <div className='m-1 w-75 bot'>
                    <Select bordered={false} placeholder="Select a Location" size='large' showSearch className='form-select mb-3 form-sel' onChange={(value) => {
                      const locationId = locationList.find(loc => loc.name === value)?._id;
                      setLocation(locationId);
                    }}>
                      {locationList?.map(c => (
                        <Option key={c._id} value={c.name}>{c.name}</Option>
                      ))}
                    </Select>
                  </div>


                  <div className='m-1 w-75 '>
                    <Select bordered={false} placeholder="Select a type" size='large' showSearch className='form-select mb-3 form-sel' onChange={(value) => { setType(value) }}>
                      <Option value="POS">POS</Option>
                      <Option value="KIOSK">KIOSK</Option>
                      <Option value="SIGNAGE">SIGNAGE</Option>
                    </Select>
                  </div>


                  <div className='m-1 w-75 mb-4'>
                    <input type="text" value={serialNumber} placeholder="Serial number" className="form-control form-sel" onChange={(e) => setSerialNumber(e.target.value)} />
                  </div>


                  <div className="m-1 w-75 mb-4">
                    <label className="btn btn-outline-secondary col-md-12 form-sel">
                      {image ? image.name : "Upload image"}
                      <input type="file" name="photo" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
                    </label>
                  </div>



                  <div className="mb-3">
                    {image && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(image)} alt="product_photo" height={"200px"} className="img img-responsive" />
                      </div>
                    )}
                  </div>


                  <div className='m-1 w-75 mb-4'>
                    <Select bordered={false} placeholder="Select a status" size='large' showSearch className='form-select mb-3 form-sel' onChange={(value) => { setStatus(value) }}>
                      <Option value="ACTIVE">ACTIVE</Option>
                      <Option value="INACTIVE">INACTIVE</Option>
                    </Select>
                  </div>

                  <div className='m-1'>
                    <button className="btn btn-outline-primary btn-create" onClick={handleCreate}>Create Device</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateDevice
