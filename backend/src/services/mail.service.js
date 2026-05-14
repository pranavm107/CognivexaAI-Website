import { Resend } from "resend";

const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing in .env");
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Premium Email Wrapper for CognivexaAI
const emailWrapper = (content, title) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding-bottom: 40px; }
    .logo { font-size: 24px; font-weight: 800; color: #4f46e5; text-decoration: none; letter-spacing: -0.025em; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 20px; letter-spacing: -0.025em; }
    .content { font-size: 15px; color: #475569; }
    .footer { text-align: center; padding-top: 40px; font-size: 12px; color: #94a3b8; }
    .btn { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff !important; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 20px; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.2); }
    .highlight-box { background: #f8fafc; border-radius: 16px; padding: 20px; margin: 20px 0; border: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="https://cognivexa.ai" class="logo">CognivexaAI</a>
    </div>
    <div class="card">
      ${title ? `<h2 class="title">${title}</h2>` : ''}
      <div class="content">
        ${content}
      </div>
    </div>
    <div class="footer">
      &copy; 2024 CognivexaAI. All rights reserved.<br/>
      Empowering Enterprises with Agentic Intelligence.
    </div>
  </div>
</body>
</html>
`;

export const sendInquiryConfirmation = async (data) => {
  const resend = getResend();
  const html = emailWrapper(`
    <p>Hi ${data.name},</p>
    <p>Thank you for reaching out to CognivexaAI. We've successfully received your inquiry and our enterprise strategy team is already reviewing your requirements.</p>
    <div class="highlight-box">
      <p style="margin:0; font-weight:700; color:#4f46e5; font-size:11px; text-transform:uppercase; letter-spacing:0.1em;">Inquiry Summary</p>
      <p style="margin:10px 0 5px 0;"><b>Interest:</b> ${data.serviceOfInterest || 'General Enterprise Solutions'}</p>
      <p style="margin:0;"><b>Reference ID:</b> #${data.id.slice(-8).toUpperCase()}</p>
    </div>
    <p>Our goal is to respond to all high-value inquiries within 24 business hours. We look forward to exploring how we can accelerate your AI transformation.</p>
  `, "We Received Your Inquiry");

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "We Received Your Inquiry | CognivexaAI",
    html
  });
};

export const sendInquiryStatusUpdate = async (data) => {
  const resend = getResend();
  let subject = "Inquiry Update | CognivexaAI";
  let title = "Regarding Your Inquiry";
  let message = "";

  switch (data.status) {
    case 'qualified':
      subject = "Your Inquiry Has Been Qualified";
      title = "Inquiry Qualified";
      message = "Our team has reviewed your project details and qualified your inquiry for the next stage of our enterprise strategy process. An account executive will reach out shortly to discuss the technical roadmap.";
      break;
    case 'proposal_sent':
      subject = "Your Custom Proposal is Ready";
      title = "Proposal Delivered";
      message = "We have prepared a comprehensive proposal tailored to your specific requirements and operational objectives. Please review the details below.";
      break;
    case 'in_discussion':
      subject = "Project Discussion Started";
      title = "Discussion Commenced";
      message = "Your project is now under active discussion with our engineering team. We are refining the implementation details to ensure maximum ROI for your organization.";
      break;
    case 'converted':
      subject = "Welcome to CognivexaAI";
      title = "Project Approved";
      message = "Congratulations! Your project has been officially approved. We are thrilled to partner with you on this transformation journey. Our onboarding team will contact you for the next steps.";
      break;
    case 'closed_lost':
      subject = "Regarding Your Inquiry";
      title = "Inquiry Status Update";
      message = "Thank you for the opportunity to discuss your project. At this time, we will be closing this inquiry. We appreciate your interest in CognivexaAI and hope to collaborate in the future.";
      break;
    default:
      message = `The status of your inquiry has been updated to: <b>${data.status.replace('_', ' ').toUpperCase()}</b>.`;
  }

  const html = emailWrapper(`
    <p>Hi ${data.name},</p>
    <p>${message}</p>
    ${data.status === 'proposal_sent' ? '<a href="#" class="btn">View Proposal Details</a>' : ''}
    <p style="margin-top:30px; border-top:1px solid #f1f5f9; padding-top:20px; font-size:13px;">If you have any immediate questions, simply reply to this email.</p>
  `, title);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject,
    html
  });
};

export const sendProposalEmail = async (data) => {
  const resend = getResend();
  const html = emailWrapper(`
    <p>Hi ${data.name},</p>
    <p>${data.message}</p>
    <div class="highlight-box">
      <p style="margin:0; font-weight:700; color:#4f46e5; font-size:11px; text-transform:uppercase; letter-spacing:0.1em;">Proposal Highlights</p>
      <p style="margin:10px 0 5px 0;"><b>Investment:</b> ${data.pricing || 'Custom Quote'}</p>
      <p style="margin:0;"><b>Timeline:</b> ${data.timeline || 'To be discussed'}</p>
    </div>
    <a href="${data.ctaLink || '#'}" class="btn">Review & Approve Proposal</a>
  `, data.subject || "Your Enterprise AI Proposal");

  const fromAddress = "onboarding@resend.dev";
  if (fromAddress === "onboarding@resend.dev") {
    console.warn('[RESEND SANDBOX MODE] Only verified/test emails can receive messages when using onboarding@resend.dev');
  }

  const response = await resend.emails.send({
    from: fromAddress,
    to: data.email,
    subject: data.subject || "Your Enterprise AI Proposal | CognivexaAI",
    html
  });

  if (response.error) {
    console.error(`[Proposal Email Failed] recipient: ${data.email}, subject: ${data.subject}, error:`, response.error);
    throw new Error(`Failed to send proposal email: ${response.error.message || 'Unknown Resend Error'}`);
  }

  console.log(`[Proposal Email Sent] recipient: ${data.email}, resendId: ${response.data?.id}`);
  return response.data;
};

export const sendAdminNoteNotification = async (data) => {
  const resend = getResend();
  const html = emailWrapper(`
    <p>Hi ${data.name},</p>
    <p>Our team has added a new update regarding your inquiry:</p>
    <div style="background:#f8fafc; border-left:4px solid #4f46e5; padding:20px; margin:20px 0; font-style:italic;">
      "${data.note}"
    </div>
    <p>We are continuing to process your request and will provide further updates as they become available.</p>
  `, "Inquiry Update from CognivexaAI");

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "New Update on Your Inquiry",
    html
  });
};

export const sendBookingAdminEmail = async (data) => {
  const resend = getResend();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.ADMIN_EMAIL,
    subject: "New Strategy Call Booking",
    html: `
      <h3>New Booking Details</h3>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone || "N/A"}</p>
      <p><b>Service:</b> ${data.service}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      ${data.meetLink ? `<p><b>Meet Link:</b> <a href="${data.meetLink}">${data.meetLink}</a></p>` : ""}
      <p><b>Message:</b> ${data.message || "N/A"}</p>
    `,
  });
};

export const sendBookingUserEmail = async (data) => {
  const resend = getResend();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "Booking Confirmed: Strategy Call",
    html: `
      <p>Hi ${data.name},</p>
      <p>Your strategy call has been confirmed!</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      ${data.meetLink ? `
      <p>Join your call:</p>
      <a href="${data.meetLink}">${data.meetLink}</a>
      ` : ""}
      <p>We look forward to speaking with you.</p>
    `,
  });
};

export const sendBookingCancellationEmail = async (data) => {
  const resend = getResend();

  // To User
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "Booking Cancelled: Strategy Call",
    html: `
      <p>Hi ${data.name},</p>
      <p>Your strategy call for <b>${data.date}</b> at <b>${data.time}</b> has been cancelled.</p>
      ${data.cancelledReason ? `<p>Reason: ${data.cancelledReason}</p>` : ""}
      <p>If you have any questions, please reach out to us.</p>
    `,
  });

  // To Admin
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.ADMIN_EMAIL,
    subject: "Booking Cancelled - Admin Alert",
    html: `
      <h3>Booking Cancellation</h3>
      <p><b>Client:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      ${data.cancelledReason ? `<p><b>Reason:</b> ${data.cancelledReason}</p>` : ""}
    `,
  });
};