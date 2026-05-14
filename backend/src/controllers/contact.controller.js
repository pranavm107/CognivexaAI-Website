import Inquiry from "../models/inquiry.model.js";
import { sendAdminEmail, sendAutoReply } from "../services/mail.service.js";

export const submitInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    await sendAdminEmail(req.body);
    await sendAutoReply(req.body);

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully"
    });
  } catch (error) {
    next(error);
  }
};
