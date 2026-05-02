import Internship from "../models/Internship.model.js";
import Report from "../models/Report.model.js";

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
