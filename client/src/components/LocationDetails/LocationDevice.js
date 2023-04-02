import React, { useEffect, useState } from 'react';
import axios from 'axios'
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import LocationMenu from "../Layout/LocationMenu";
import '../Styles/LocationDevice.css'


const LocationDevice = () => {

    const params = useParams();

    const [devices, setDevices] = useState([]);
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(true);


    // ---------GET ALL DEVICE LIST IN SELECTED LOCATION------------>
    const getAllDevices = async () => {
        try {
            const { data } = await axios.get(`/api/v1/location/get-specificLocation/${params.id}`);

            if (data?.success) {
                setDevices(data?.location.devices);
                setLocation(data?.location);

            }
            else {
                toast.error("Something went wrong in getting Location");
            }

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
        getAllDevices();
    }, [params?.id]);


    //---------------DELETE BUTTON---------------->
    const handleDelete = async (deviceId) => {
        try {
            const { data } = await axios.delete(`/api/v1/device/delete-device/${params.id}/devices/${deviceId}`);
            toast.success("Product Deleted Successfully");
            window.location.reload();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    return (
        <Layout title={"DEVICE LIST IN SELECTED LOCATION"}>

            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <LocationMenu />
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
                            <div className="col-md-8 card">
                                <div className='heading2'>
                                    <h1>ALL DEVICES IN SINGLE LOCATION</h1>
                                    <hr />
                                    <h4>LOCATION NAME - {location.name}</h4>
                                    <h4>Location Address - {location.address}</h4>
                                    <h4>Location Phone Number - {location.phone}</h4>
                                </div>
                                <div className="row container">
                                    {devices?.map((device) => (
                                        <div className="card m-2 card-size" key={device._id}>
                                            <img
                                                src={`/api/v1/device/device-image/${device._id}`}
                                                className="card-img-top image-size"
                                                alt={device.name}
                                            />
                                            <div className="card-body card-a">
                                                <div className="card-name">
                                                    <p>SERIAL NUMBER - {device.serialNumber}</p>
                                                    <p>TYPE - {device.type}</p>
                                                    <p>STATUS - {device.status}</p>

                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <button className="btn btn-danger ms-2" onClick={() => handleDelete(device._id)}>
                                                    DELETE DEVICE
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        </>
                    )}
                </div>

            </div>

        </Layout>
    )
}

export default LocationDevice;