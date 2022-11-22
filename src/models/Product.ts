import { Schema, model } from "mongoose";

interface IProduct {
    name: string
    price: string
    size: "sm" | "lg" | "xl"
    desc: string
    images: string[]
    liked: boolean
}

const productSchema = new Schema({

}, { timestamps: true });

export default model<IProduct>("Product", productSchema);