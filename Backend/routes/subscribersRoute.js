import express from "express";
import { listSubscribers } from "../controllers/subscribersController.js";

const subscibersRouter = express.Router();

subscibersRouter.get("/list", listSubscribers);

export default subscibersRouter;
