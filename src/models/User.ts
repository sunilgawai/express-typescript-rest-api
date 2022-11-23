import { Schema, model } from "mongoose";
import { IUser } from "../@types";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer"
    }
}, { timestamps: true })

export default model<IUser>("User", userSchema);