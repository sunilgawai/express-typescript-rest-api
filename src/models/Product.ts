import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
    name: string
    price: string
    size: "sm" | "lg" | "xl"
    desc: string
    images: string[]
    liked: boolean
    featured: boolean
}

const productSchema = new Schema({

}, { timestamps: true });

export default model<IProduct>("Product", productSchema);