import Project from "../models/Project.model.js";
import ShowcaseProject from "../models/ShowcaseProject.model.js";
import Report from "../models/Report.model.js";
import sendEmail from "../utils/sendEmail.js";

export const registerProject = async (req, res) => {
  try {
    // [FIXED]: Whitelist fields to prevent NoSQL injection (was: req.body)
    const { companyName, contactPerson, email, phone, projectTitle, projectDescription, techStack, budget, timeline } = req.body;
    const project = await Project.create({
      companyName, contactPerson, email, phone, projectTitle, projectDescription, techStack, budget, timeline
    });

    // Send confirmation email to the client
    await sendEmail({
      email: email,
      subject: `Project Proposal Received: ${projectTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #9062FF;">Hello ${contactPerson},</h2>
          <p>Thank you for trusting MakeTechBerry with your project: <strong>${projectTitle}</strong>.</p>
          <p>We have received your proposal and our team will be reviewing your requirements shortly to prepare an initial consultation or estimate.</p>
          <p>We will be in touch with you very soon!</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>MakeTechBerry Sales Team</strong></p>
        </div>
      `,
    });

    // Send notification to Admin
    if (process.env.SMTP_USER) {
      await sendEmail({
        email: process.env.SMTP_USER,
        subject: `New Project Proposal: ${companyName} - ${projectTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #9062FF;">New Project Proposal</h2>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Contact Person:</strong> ${contactPerson}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Project Title:</strong> ${projectTitle}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Description:</strong><br/>${projectDescription}</p>
          </div>
        `,
      });
    }

    res.status(201).json({
      success: true,
      message: "Project request submitted successfully",
      data: project
    });
  } catch (error) {
    console.error("Project registration error:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to submit project. Please check your input."
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get projects error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects."
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Also delete related reports
    await Report.deleteMany({ 
      type: "Project",
      originalId: id 
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    console.error("Delete project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete project.",
    });
  }
};

export const approveProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Create report entry
    await Report.create({
      type: "Project",
      action: "Approved",
      originalId: id,
      data: project.toObject(),
    });

    res.status(200).json({
      success: true,
      message: "Project approved successfully",
      data: project,
    });
  } catch (error) {
    console.error("Approve project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to approve project.",
    });
  }
};

export const rejectProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Create report entry
    await Report.create({
      type: "Project",
      action: "Rejected",
      originalId: id,
      data: project.toObject(),
    });

    res.status(200).json({
      success: true,
      message: "Project rejected successfully",
      data: project,
    });
  } catch (error) {
    console.error("Reject project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to reject project.",
    });
  }
};

// ========== SHOWCASE PROJECT CONTROLLERS ==========

// Get all showcase projects (public - no auth required)
export const getShowcaseProjects = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status) {
      query.status = status.toLowerCase();
    }

    const projects = await ShowcaseProject.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get showcase projects error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects."
    });
  }
};

// Get showcase projects by status (public endpoint)
export const getShowcaseProjectsByStatus = async (req, res) => {
  try {
    const projects = await ShowcaseProject.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get showcase projects by status error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects."
    });
  }
};

// Get single showcase project (admin)
export const getShowcaseProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ShowcaseProject.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("Get showcase project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project."
    });
  }
};

// Create showcase project (admin only)
export const createShowcaseProject = async (req, res) => {
  try {
    // [FIXED]: Whitelist fields to prevent NoSQL injection (was: req.body)
    const { projectTitle, projectDescription, techStack, status, teamMembers, role, featuredImage } = req.body;
    const project = await ShowcaseProject.create({
      projectTitle, projectDescription, techStack, status, teamMembers, role, featuredImage
    });

    res.status(201).json({
      success: true,
      message: "Showcase project created successfully",
      data: project
    });
  } catch (error) {
    console.error("Create showcase project error:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create project. Please check your input."
    });
  }
};

// Update showcase project (admin only)
export const updateShowcaseProject = async (req, res) => {
  try {
    const { id } = req.params;
    // [FIXED]: Whitelist fields to prevent NoSQL injection (was: req.body)
    const { projectTitle, projectDescription, techStack, status, teamMembers, role, featuredImage } = req.body;
    const project = await ShowcaseProject.findByIdAndUpdate(
      id,
      { projectTitle, projectDescription, techStack, status, teamMembers, role, featuredImage },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Showcase project updated successfully",
      data: project
    });
  } catch (error) {
    console.error("Update showcase project error:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update project. Please check your input."
    });
  }
};

// Delete showcase project (admin only)
export const deleteShowcaseProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ShowcaseProject.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Showcase project deleted successfully",
      data: project
    });
  } catch (error) {
    console.error("Delete showcase project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete project."
    });
  }
};

// Change showcase project status (admin only)
export const changeShowcaseProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["ongoing", "completed"].includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'ongoing' or 'completed'"
      });
    }

    const project = await ShowcaseProject.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project status updated successfully",
      data: project
    });
  } catch (error) {
    console.error("Change project status error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update project status."
    });
  }
};
