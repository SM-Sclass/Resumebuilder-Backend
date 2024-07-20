import mongoose from "mongoose";
import { section,format } from "./tempresSectionModel";

const templateDataSchema = new mongoose.Schema({
  sections: [section],
  formatting: format
});

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  templateData: { type: templateDataSchema, required: true }
});

export const Template = mongoose.model('Template', templateSchema);