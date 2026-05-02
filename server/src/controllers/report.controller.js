import Report from "../models/Report.model.js";

export const getAllReports = async (req, res) => {
  try {
    // [FIXED]: Removed side-effect cleanup from GET — TTL index handles expiry automatically
    const reports = await Report.find()
      .sort({ approvedAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error("Get reports error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports.",
    });
  }
};

export const getReportsByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!["Internship", "Project"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report type",
      });
    }

    const reports = await Report.find({ type })
      .sort({ approvedAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error("Get reports by type error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports.",
    });
  }
};

export const getReportsByAction = async (req, res) => {
  try {
    const { action } = req.params;
    
    if (!["Approved", "Rejected"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action type",
      });
    }

    const reports = await Report.find({ action })
      .sort({ approvedAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error("Get reports by action error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports.",
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
      data: report,
    });
  } catch (error) {
    console.error("Delete report error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete report.",
    });
  }
};
