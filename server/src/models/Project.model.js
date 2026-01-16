import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    contactPerson: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    projectTitle: {
      type: String,
      required: true
    },
    projectDescription: {
      type: String,
      required: true
    },
    techStack: {
      type: String,
      required: true
    },
    budget: {
      type: String
    },
    timeline: {
      type: String
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
