import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')
})
// to use ==>const { error } = registerSchema.validate(req.body);

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});



const productValidationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    size: Joi.string().required(), // "sm" | "lg" | "xl"
    desc: Joi.string().required(),
    images: Joi.array(),
    liked: Joi.boolean().required(),
    featured: Joi.boolean().required().default(false),
})
export { registerSchema, loginSchema, productValidationSchema };