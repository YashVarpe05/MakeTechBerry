import Internship from "../models/Internship.model.js";
import Report from "../models/Report.model.js";
import sendEmail from "../utils/sendEmail.js";

export const registerInternship = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required. Please upload a PDF file.",
      });
    }

    // [FIXED]: Whitelist fields to prevent NoSQL injection (was: ...req.body)
    const { fullName, email, phone, domain, duration, college } = req.body;

    const internship = await Internship.create({
      fullName,
      email,
      phone,
      domain,
      duration,
      college,
      resume: req.file.path,
    });

    // Send welcome/confirmation email to the applicant
    await sendEmail({
      email: email,
      subject: `Application Received: ${domain} Internship at MakeTechBerry`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #9062FF;">Hi ${fullName},</h2>
          <p>Thank you for applying for the <strong>${domain} Internship (${duration})</strong> at MakeTechBerry!</p>
          <p>We have successfully received your application and resume. Our recruitment team will review your profile and get back to you with the next steps shortly.</p>
          <p>Stay tuned!</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>MakeTechBerry Recruitment Team</strong></p>
        </div>
      `,
    });

    // Send notification to Admin
    if (process.env.SMTP_USER) {
      await sendEmail({
        email: process.env.SMTP_USER,
        subject: `New Internship Application: ${fullName} - ${domain}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #9062FF;">New Internship Application</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Domain:</strong> ${domain}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>College:</strong> ${college}</p>
          </div>
        `,
      });
    }

    res.status(201).json({
      success: true,
      message: "Internship registered successfully",
      data: internship,
    });
  } catch (error) {
    console.error("Internship registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: internships,
    });
  } catch (error) {
    console.error("Get internships error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch internships.",
    });
  }
};

export const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findByIdAndDelete(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Also delete related reports
    await Report.deleteMany({ 
      type: "Internship",
      originalId: id 
    });

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
      data: internship,
    });
  } catch (error) {
    console.error("Delete internship error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete internship.",
    });
  }
};

export const approveInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Create report entry
    await Report.create({
      type: "Internship",
      action: "Approved",
      originalId: id,
      data: internship.toObject(),
    });

    res.status(200).json({
      success: true,
      message: "Internship approved successfully",
      data: internship,
    });
  } catch (error) {
    console.error("Approve internship error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to approve internship.",
    });
  }
};

export const rejectInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Create report entry
    await Report.create({
      type: "Internship",
      action: "Rejected",
      originalId: id,
      data: internship.toObject(),
    });

    res.status(200).json({
      success: true,
      message: "Internship rejected successfully",
      data: internship,
    });
  } catch (error) {
    console.error("Reject internship error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to reject internship.",
    });
  }
};
