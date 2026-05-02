import Message from "../models/Message.model.js";
import sendEmail from "../utils/sendEmail.js";

export const createMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    // Send auto-reply to the user
    await sendEmail({
      email: email,
      subject: `MakeTechBerry: We received your message about "${subject}"`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #9062FF;">Hello ${fullName},</h2>
          <p>Thank you for reaching out to MakeTechBerry! This is an automated email to confirm that we have received your message regarding <strong>${subject}</strong>.</p>
          <p>Our team is reviewing your inquiry and will get back to you as soon as possible.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The MakeTechBerry Team</strong></p>
        </div>
      `,
    });

    // Send notification to Admin (Assuming SMTP_USER is the admin email)
    if (process.env.SMTP_USER) {
      await sendEmail({
        email: process.env.SMTP_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #9062FF;">New Contact Request</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          </div>
        `,
      });
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create message error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    });
  }
};

export const getMessages = async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get messages error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Delete message error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete message.",
    });
  }
};
