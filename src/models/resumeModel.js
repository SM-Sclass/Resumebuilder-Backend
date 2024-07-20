import mongoose from "mongoose";
import { section,format } from "./tempresSectionModel";
import { User } from "./userModel";

const resumeDataSchema = new mongoose.Schema({
    sections: [section],
    formatting: format
});
  
const resumeSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Template,
      required: true
    },
    resumeData: { type: resumeDataSchema, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


export const Resume = mongoose.module("Resume",resumeSchema);