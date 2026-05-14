import express from "express";
import { getAvailability, createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/availability", getAvailability);
router.post("/book", createBooking);

export default router;
