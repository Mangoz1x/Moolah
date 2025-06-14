import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true },
        image: { type: String },
        role: { type: String, default: 'user' },
    },
    { timestamps: true }
);

export default models.User || model('User', UserSchema);
