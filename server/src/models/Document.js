import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    versions: [
      {
        content: { type: String },
        updatedAt: { type: Date, default: Date.now },
      }
    ],
   
  },
  { timestamps: true } 
);

export default mongoose.model("Document", documentSchema);