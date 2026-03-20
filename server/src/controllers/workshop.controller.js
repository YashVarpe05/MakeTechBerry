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
    res.status(500).json({
      success: false,
      message: error.message
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create a new workshop (Admin only)
export const createWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.create(req.body);

    res.status(201).json({
      success: true,
      message: "Workshop created successfully",
      data: workshop
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update an existing workshop (Admin only)
export const updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findByIdAndUpdate(
      id,
      req.body,
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
    res.status(400).json({
      success: false,
      message: error.message
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
