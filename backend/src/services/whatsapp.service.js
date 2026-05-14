import twilio from "twilio";

export const sendWhatsAppMessage = async (data) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const whatsappNumber = "whatsapp:+14155238886";

    if (!accountSid || !authToken) {
      console.warn("Twilio credentials missing. WhatsApp messages will not be sent.");
      return;
    }

    const client = twilio(accountSid, authToken);

    const messageBody = data.message || `Hi ${data.name},

Your booking is confirmed.

Date: ${data.date}
Time: ${data.time}${data.meetLink ? `

Join your call:
${data.meetLink}` : ""}

– CognivexaAI`;

    await client.messages.create({
      body: messageBody,
      from: whatsappNumber,
      to: `whatsapp:${data.phone}`,
    });

    console.log("WhatsApp sent successfully");
  } catch (error) {
    console.error("WhatsApp error:", error.message);
  }
};

export const sendWhatsAppCancellation = async (data) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const whatsappNumber = "whatsapp:+14155238886";

    if (!accountSid || !authToken) return;

    const client = twilio(accountSid, authToken);

    const messageBody = `Hi ${data.name}, your booking for ${data.date} at ${data.time} has been cancelled.${data.cancelledReason ? ` Reason: ${data.cancelledReason}` : ""} – CognivexaAI`;

    await client.messages.create({
      body: messageBody,
      from: whatsappNumber,
      to: `whatsapp:${data.phone}`,
    });
  } catch (error) {
    console.error("WhatsApp cancellation error:", error.message);
  }
};
