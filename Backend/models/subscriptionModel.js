import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const subscriptionModel =
  mongoose.models.product || mongoose.model("subscriber", subscriptionSchema);

export default subscriptionModel;
