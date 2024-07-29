import mongoose from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    linkedinId: {
        type: String,
        default: null,
    },
    linkedinAccessToken: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User