import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['POS', 'KIOSK', 'SIGNAGE'],
    required: true
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
  }
});

const Device = mongoose.model('Device', deviceSchema);

export default Device;