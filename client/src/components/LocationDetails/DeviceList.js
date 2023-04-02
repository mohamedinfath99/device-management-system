import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import Layout from '../Layout/Layout';
import LocationMenu from '../Layout/LocationMenu';

function DeviceList() {

    const [devices, setDevices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    //---------GET ALL DEVICE DETAILS------------------------>
    const getAllDevices = async () => {
        try {
            const { data } = await axios.get("/api/v1/device/get-device");

            if (data?.success) {
                setDevices(data?.devices);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting Devices");

        }
        finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        getAllDevices();
    }, []);


    const devicesPerPage = 6;
    const totalPages = Math.ceil(devices.length / devicesPerPage);
    const pageNumbers = [];


    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    const indexOfLastDevice = currentPage * devicesPerPage;
    const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
    const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <LocationMenu />
                    </div>
                    <div className="col-md-8 card">
                        <div className='heading2'>
                            <h1>ALL DEVICES LIST</h1>
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
                                    {currentDevices?.map((device) => (
                                        <div className="card m-2 card-size" key={device._id}>
                                            <img
                                                src={`/api/v1/device/device-image/${device._id}`}
                                                className="card-img-top image-size"
                                                alt={device.name}
                                            />

                                            <div className="card-body card-a">
                                                <div>
                                                    <h6>LOCATION NAME - {device.location.name}</h6>
                                                </div>
                                                <div className="card-name">
                                                    <p>SERIAL NUMBER - #{device.serialNumber}</p>
                                                    <p>TYPE - {device.type}</p>
                                                    <p>STATUS - {device.status}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-center mt-3">
                                    <nav>
                                        <ul className="pagination">
                                            {currentPage > 1 && (
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={() => paginate(currentPage - 1)}
                                                    >
                                                        Previous
                                                    </button>
                                                </li>
                                            )}

                                            {pageNumbers.map((number) => (
                                                <li className={`page-item ${number === currentPage ? "active" : ""}`} key={number}>
                                                    <button className="page-link" onClick={() => paginate(number)}>
                                                        {number}
                                                    </button>
                                                </li>
                                            ))}

                                            {currentPage < totalPages && (
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={() => paginate(currentPage + 1)}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DeviceList;

