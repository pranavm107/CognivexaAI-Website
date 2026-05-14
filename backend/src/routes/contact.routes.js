import express from "express";
import { submitInquiry } from "../controllers/contact.controller.js";
import validate from "../middleware/validate.middleware.js";
import { inquirySchema } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/", validate(inquirySchema), submitInquiry);

export default router;
