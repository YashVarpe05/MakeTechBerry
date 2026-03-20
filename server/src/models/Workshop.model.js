import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      default: 50
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ["Upcoming", "Open", "Registration Opening Soon", "Closed", "Completed"],
      default: "Upcoming"
    },
    image: {
      type: String,
      trim: true,
      default: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Workshop", workshopSchema);
