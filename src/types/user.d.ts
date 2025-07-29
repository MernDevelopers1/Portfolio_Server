// File: src/types/user.d.ts

import { Document } from "mongoose";

interface Projects {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  technologies: string[];
  imagePaths?: string[];
  Url?: string;
}

interface Skills {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
}
interface Education {
  degree: string;
  institution: string;
  startDate: Date;
  endDate: Date;
}
interface Experience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}
interface Banner {
  title: string;
  subtitle: string;
  imagePath?: string;
  ctaText?: string;
  ctaUrl?: string;
}
export interface IUser {
  _id?: string;
  name: string;
  email?: string;
  username?: string;
  profilePicture?: string;
  password?: string;
  LoginMethod?: "local" | "google" | "github" | "facebook";
  phone?: string;
  address?: string;
  isDeleted?: boolean;
  Banner?: Banner;
  createdAt?: Date;
  updatedAt?: Date;
  Projects?: Projects[];
  Skills?: Skills[];
  Education?: Education[];
  WorkExperience?: Experience[];
}

export interface IUserSchema extends IUser, Document {} // Extend both
