import express from "express";

import isAuth from "../middleware/isAuth.js";
import { genrateWebsite, getWebsiteById, getAllWebsites, changes } from "../controllers/websites.controller.js";
const websiteRouter = express.Router();




websiteRouter.post("/genrate", isAuth, genrateWebsite);
websiteRouter.post("/update/:id", isAuth, changes);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);
websiteRouter.get("/get-all", isAuth, getAllWebsites);




export default websiteRouter;