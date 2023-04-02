import express from "express";
import formidable from "express-formidable";
import {
    createDeviceController,
    deviceController, 
    deletedeviceCOntroller,
    imageDeviceController
} from "../controllers/deviceController.js";


const router = express.Router();

//**-----ROUTES------->

//-----CREATE DEVICE------->
router.post("/create-device", formidable(), createDeviceController);


//-----GET ALL DEVICE------->
router.get("/get-device", deviceController);


//-----DELETE DEVICE------->
router.delete("/delete-device/:locationId/devices/:deviceId", deletedeviceCOntroller);


//-----GET DEVICE IMAGE------->
router.get("/device-image/:id", imageDeviceController);



export default router;
