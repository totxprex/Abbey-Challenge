import mongoose, { Document } from "mongoose";

export class CoursesType {
  name: string;
  category: string;
  resources: {
    content: string;
    external_links: string[];
    videos: string[];
    createdAt: Date;
    title: string;
  }[];
  teachers: any[];
  students: any[];
  description: string;
  createdAt: Date;
  banner: string;
}

export interface ICourses extends CoursesType, Document { }

export const CoursesSchema = new mongoose.Schema<CoursesType>({
  name: {
    type: String,
    maxLength: 1000,
    required: [true, 'A course must have a name']
  },
  category: {
    type: String,
    maxLength: 1000,
    required: [true, 'A course must have a name']
  },
  resources: [{
    title: {
      type: String,
      required: [true, "A Course Must Have A title"],
      maxLength: 5000
    },
    content: {
      type: String,
      required: [true, "A Course Must Have A Resource"],
      maxLength: 5000
    },
    external_links: [{
      type: String,
      maxLength: 1000
    }],
    videos: [{
      type: String,
      maxLength: 1000
    }],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }],
  teachers: [{
    type: mongoose.Schema.ObjectId,
    ref: "users",
  }],
  students: [{
    type: mongoose.Schema.ObjectId,
    ref: "users",
  }],
  description: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  banner: {
    type: String,
    default: ""
  }
});

CoursesSchema.index({ title: 1 }, { unique: true });
