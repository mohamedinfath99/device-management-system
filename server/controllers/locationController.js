import Location from "../models/location.js";
import Device from "../models/device.js"


export const createLocationController = async (req, res) => {
  try {

    const { name, address, phone } = req.body;

    if (!name) {
      return res.status(422).send({ message: "Location Name is Required" });
    }

    const existingLocation = await Location.findOne({ name });

    if (existingLocation) {
      return res.status(422).send({
        success: false,
        message: "Location already exists",
      });
    }

    const location = await new Location({
      name,
      address,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "New location created",
      location,
    });

  }
  catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      error,
      message: "Error creating location",
    });
  }
};


export const updateLocationController = async (req, res) => {
  try {

    const { name, address, phone } = req.body;
    const { id } = req.params;

    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).send({
        success: false,
        message: 'Location not found',
      });
    }

    location.name = name || location.name;
    location.address = address || location.address;
    location.phone = phone || location.phone;

    await location.save();

    res.status(200).send({
      success: true,
      message: 'Location updated successfully',
      location,
    });

  }
  catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating location',
    });
  }
};


export const locationControlller = async (req, res) => {
  try {

    const locations = await Location.find().populate('devices');

    res.status(200).send({
      success: true,
      message: "All locations list",
      locations,
    });

  }
  catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all locations",
    });
  }
};


export const deleteLocationCOntroller = async (req, res) => {
  try {

    const { id } = req.params;

    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).send({
        success: false,
        message: 'Location not found',
      });
    }

    await Location.findByIdAndDelete(id);

    await Device.deleteMany({ location: id });

    res.status(200).send({
      success: true,
      message: 'Location and associated devices deleted',
    });

  }
  catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting location and associated devices',
    });
  }
};


export const specificLocationController = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('devices');
    res.status(200).send({
      success: true,
      location,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting location and devices',
    });
  }
};