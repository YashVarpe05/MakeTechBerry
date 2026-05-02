import Workshop from "../models/Workshop.model.js";

// Get all workshops (public - no auth required)
export const getWorkshops = async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    const workshops = await Workshop.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workshops.length,
      data: workshops
    });
  } catch (error) {
    console.error("Get workshops error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workshops."
    });
  }
};

// Get single workshop
export const getWorkshopById = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findById(id);

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found"
      });
    }

    res.status(200).json({
      success: true,
      data: workshop
    });
  } catch (error) {
    console.error("Get workshop error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workshop."
    });
  }
};

// Create a new workshop (Admin only)
export const createWorkshop = async (req, res) => {
  try {
    // [FIXED]: Whitelist fields to prevent NoSQL injection (was: req.body)
    const { title, category, date, duration, location, description, instructor, capacity, tags, status, image } = req.body;
    const workshop = await Workshop.create({
      title, category, date, duration, location, description, instructor, capacity, tags, status, image
    });

    res.status(201).json({
      success: true,
      message: "Workshop created successfully",
      data: workshop
    });
  } catch (error) {
    console.error("Create workshop error:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create workshop. Please check your input."
    });
  }
};

// Update an existing workshop (Admin only)
export const updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    // [FIXED]: Whitelist fields to prevent NoSQL injection (was: req.body)
    const { title, category, date, duration, location, description, instructor, capacity, tags, status, image } = req.body;
    const workshop = await Workshop.findByIdAndUpdate(
      id,
      { title, category, date, duration, location, description, instructor, capacity, tags, status, image },
      { new: true, runValidators: true }
    );

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Workshop updated successfully",
      data: workshop
    });
  } catch (error) {
    console.error("Update workshop error:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update workshop. Please check your input."
    });
  }
};

// Delete a workshop (Admin only)
export const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findByIdAndDelete(id);

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Workshop deleted successfully",
      data: workshop
    });
  } catch (error) {
    console.error("Delete workshop error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete workshop."
    });
  }
};
