import { Worker } from "bullmq";
import { sendEmail } from "../utils/sendEmail.js";

export const worker = new Worker(
  "emailQueue",
  async (job) => {
    if (job.name === "sendWelcomeEmail") {
      await sendEmail({
        to: job.data.email,
        subject: "Welcome 🎉",
        html: "<h1>Welcome to our platform</h1>",
      });
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);
