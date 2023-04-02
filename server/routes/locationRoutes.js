import express from "express";
import {
    createLocationController,
    updateLocationController,
    specificLocationController,
    deleteLocationCOntroller,
    locationControlller,
} from "../controllers/locationController.js";


const router = express.Router();


//**-----ROUTES------->

//-----CREATE LOCATION------->
router.post("/create-location", createLocationController);


//-----UPDATE LOCATION------->
router.put("/update-location/:id", updateLocationController);


//-----GET LOCATION------->
router.get("/get-location", locationControlller);


//-----DELETE LOCATION------->
router.delete("/delete-location/:id", deleteLocationCOntroller);


//---------GET ALL DEVICE LIST IN SELECTED LOCATION------------>
router.get("/get-specificLocation/:id", specificLocationController);



export default router;
