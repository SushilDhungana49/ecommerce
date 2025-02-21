import subscriptionModel from "../models/subscriptionModel.js";

const listSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriptionModel.find({});
    res.json({ success: true, subscribers });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

export { listSubscribers };
