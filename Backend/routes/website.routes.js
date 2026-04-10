import express from "express";

import isAuth from "../middleware/isAuth.js";
import { genrateWebsite } from "../controllers/websites.controller.js";
const websiteRouter = express.Router();




websiteRouter.post("/genrate", isAuth, genrateWebsite)





export default websiteRouter;