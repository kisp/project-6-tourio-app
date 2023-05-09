import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
