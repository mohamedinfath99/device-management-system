import Device from '../models/device.js';
import Location from '../models/location.js';
import fs from 'fs';




export const createDeviceController = async (req, res) => {
  try {

    const { serialNumber, type, status, location } = req.fields;
    const { image } = req.files;

    if (!serialNumber) {
      return res.status(422).send({ message: "SerialNumber is Required" });
    }
    
    if (!type) {
      return res.status(422).send({ message: "Type is Required" });
    }
    
    if (!location) {
      return res.status(422).send({ message: "Location is Required" });
    }
    
    if (!image || image.size > 10000000) {
      return res.status(422).send({ message: "Image is Required and Should be less then 1mb" });
    }

    const device = new Device({ serialNumber, type, status, location });

    if (image) {
      device.image.data = fs.readFileSync(image.path);
      device.image.contentType = image.type;
    }

    const foundLocation = await Location.findById(location);

    if (!foundLocation) {
      return res.status(404).send({
        success: false,
        message: "Location not found"
      });
    }

    foundLocation.devices.push(device._id)
    await foundLocation.save()

    const savedDevice = await device.save();

    return res.status(201).send({
      success: true,
      message: "Device created successfully",
      data: savedDevice

    });

  } 
  catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    });
  }
};



export const deviceController = async (req, res) => {
  try {
    const devices = await Device.find().populate('location')

    res.status(200).json({
      success: true,
      message: "All devices list",
      devices,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
      message: "Error while getting all devices",
    });
  }
};



export const deletedeviceCOntroller = async (req, res) => {
  try {
    const { locationId, deviceId } = req.params;

    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    location.devices.pull(deviceId);
    await location.save();

    await Device.deleteOne({ _id: deviceId });

    res.status(200).json({
      success: true,
      message: 'Device deleted',
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
      message: "Error while deleting device",
    });
  }
};



export const imageDeviceController = async (req, res) => {
  try {
    const image = await Device.findById(req.params.id).select('image');

    if (image.image.data) {
      res.set("Content-type", image.image.contentType);
      return res.status(200).send(
        image.image.data
      );
    }

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
      message: "Error getting Image",
    });
  }
}


