import Project from "../models/Project.model.js";

export const registerProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project request submitted successfully",
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
