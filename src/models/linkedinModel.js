import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String }
});

const workExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String }
});

const linkedinProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  linkedinProfileUrl: { type: String, required: true },
  skills: [{ type: String }],
  resume: { type: String },
  internships: [internshipSchema],
  workExperiences: [workExperienceSchema],
  projects: [projectSchema],
  otherInfo: { type: mongoose.Schema.Types.Mixed }
});

export const LinkedInProfile = mongoose.models.LinkedInProfile || mongoose.model('LinkedInProfile', linkedinProfileSchema);