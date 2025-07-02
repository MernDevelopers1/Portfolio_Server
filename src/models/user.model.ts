import mongoose, { Schema, Document } from "mongoose";
import { IUserSchema } from "../types/user";
// import { IUser as IUserBase } from "../types/user"; // Import your IUser type

const userSchema = new Schema<IUserSchema>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    phone: String,
    address: String,
    isDeleted: { type: Boolean, default: false },
    Banner: {
      title: String,
      subtitle: String,
      imagePath: String,
      ctaText: String,
      ctaUrl: String,
    },
    Projects: [
      {
        title: { type: String, required: true },
        description: String,
        startDate: Date,
        endDate: Date,
        technologies: [String],
        imagePaths: [String],
        Url: String,
      },
    ],
    Skills: [
      {
        name: { type: String, required: true },
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          required: true,
        },
      },
    ],
    Education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    WorkExperience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUserSchema>("User", userSchema);
