import express from "express";

import isAuth from "../middleware/isAuth.js";
import { genrateWebsite, getWebsiteById, getAllWebsites, changes, deploy, getBySlug } from "../controllers/websites.controller.js";
const websiteRouter = express.Router();




websiteRouter.post("/genrate", isAuth, genrateWebsite);
websiteRouter.post("/update/:id", isAuth, changes);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);
websiteRouter.get("/get-all", isAuth, getAllWebsites);
websiteRouter.get("/deploy/:id", isAuth, deploy);
websiteRouter.get("/get-by-slug/:id", getBySlug);




export default websiteRouter;