import React, { useEffect, useState } from 'react';
import axios from 'axios'
import toast from "react-hot-toast";
import { Modal } from "antd";
import Layout from '../Layout/Layout';
import LocationMenu from '../Layout/LocationMenu';
import LocationForm from '../Form/LocationForm';
import '../Styles/CreateLocation.css'


function CreateLocation() {

  const [locationList, setLocationList] = useState([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [loading, setLoading] = useState(true);


  // --------FORM BUTTON - HANDLE SUBMIT------------>
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/v1/location/create-location', { name, address, phone });

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllLocation();
        setName('');
        setAddress('');
        setPhone('');
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


  //---------------DELETE BUTTON---------------->
  const handleDelete = async (Id) => {
    try {

      const { data } = await axios.delete(`/api/v1/location/delete-location/${Id}`);

      if (data.success) {
        toast.success(`Location is Deleted`);
        getAllLocation();
        window.location.reload();
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error("Somtihing went wrong");
    }
  };


  //---------------UPDATE BUTTON---------------->
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.put(
        `/api/v1/location/update-location/${selected._id}`,
        { name: updatedName, address: updatedAddress, phone: updatedPhone }
      );

      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedAddress("");
        setUpdatedPhone("");
        setVisible(false);
        getAllLocation();
        window.location.reload();

      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Somtihing went wrong");
    }
  };


  return (
    <Layout title={"CREATE NEW LOCATION"}>

      <div className="container-fluid m-3 p-3">

        <div className="row">
          <div className="col-md-3">
            <LocationMenu />
          </div>

          <div className="col-md-8 card ">
            <div className='heading'>
              <h1>CREATE NEW LOCATION</h1>
            </div>

            <div className='card-details'>
              {console.log('locationList:', locationList)}
              <div className='p-3'>
                <LocationForm handleSubmit={handleSubmit} value={name} setValue={setName} address={address} setAddress={setAddress} phone={phone} setPhone={setPhone} />
              </div>


              <div className="w-75">
                <table className="table">

                  <thead>
                    <tr>
                      <th scope="col">LOCATION</th>
                      <th scope="col">ADDRESS</th>
                      <th scope="col">PHONE</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>

                  {loading && (
                    <div className="d-flex justify-content-center my-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  )}

                  {!loading && (
                    <>

                      <tbody>
                        {locationList?.map((c) => (
                          <tr key={`${c._id}`}>
                            <td>{c.name}</td>
                            <td>{c.address}</td>
                            <td>{c.phone}</td>

                            <td>
                              <button className="btn btn-primary ms-2" onClick={() => { setVisible(true); setUpdatedName(c.name); setUpdatedAddress(c.address); setUpdatedPhone(c.phone); setSelected(c) }}>
                                Edit
                              </button>

                              <button className="btn btn-danger ms-2" onClick={() => { handleDelete(c._id) }} >
                                Delete
                              </button>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </>
                  )}
                </table>
              </div>

              <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} className='modal-width'>
                <LocationForm value={updatedName} setValue={setUpdatedName} address={updatedAddress} setAddress={setUpdatedAddress} phone={updatedPhone} setPhone={setUpdatedPhone} handleSubmit={handleUpdate} />
              </Modal>
            </div>
          </div>

        </div>

      </div>

    </Layout>
  )
}

export default CreateLocation