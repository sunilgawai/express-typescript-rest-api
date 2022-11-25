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
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
        // get: v => `${APP_URL}/public/uploads/${v}`
    },
    liked: {
        type: Boolean,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },

}, { timestamps: true });


export default model<IProduct>("Product", productSchema);

// type User = InferSchemaType<typeof schema>;
// InferSchemaType will determine the type as follows:
// type User = {
//   name: string;
//   email: string;
//   avatar?: string;
// }