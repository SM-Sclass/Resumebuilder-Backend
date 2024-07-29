import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    order: { type: Number, required: true }
  });
  
  const formattingSchema = new mongoose.Schema({
    fontFamily: { type: String },
    fontSize: { type: Number },
    lineSpacing: { type: Number },
    margin: {
      top: { type: Number },
      bottom: { type: Number },
      left: { type: Number },
      right: { type: Number }
    }
  });
export const format = mongoose.models.format || mongoose.model("format",formattingSchema);
export const section = mongoose.models.section || mongoose.model("section",sectionSchema);


