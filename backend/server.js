import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { startReminderService } from "./src/services/reminder.service.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startReminderService();
  });
});

