import nodemailer from "nodemailer";

/**
 * Send an email using Nodemailer
 * @param {Object} options
 * @param {string} options.email - The recipient's email address
 * @param {string} options.subject - The subject of the email
 * @param {string} options.message - The text body of the email
 * @param {string} options.html - (Optional) The HTML body of the email
 */
const sendEmail = async (options) => {
  try {
    // Create a transporter
    // For development, you can use Mailtrap or a Gmail App Password
    // These should be configured in your .env file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASS, // Your email password or app password
      },
    });

    // Define the email options
    const mailOptions = {
      from: `${process.env.FROM_NAME || 'MakeTechBerry'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    // We don't want the whole request to fail if the email fails,
    // so we catch the error and log it.
    return false;
  }
};

export default sendEmail;
