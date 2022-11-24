import { Schema, model, Document } from "mongoose";

interface Token extends Document {
    token: string;
}

const tokenSchema = new Schema({
    token: { type: String, unique: true }
}, { timestamps: false })

export default model<Token>("RefreshToken", tokenSchema);