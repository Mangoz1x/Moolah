import { Schema, models, model } from 'mongoose';

const CardSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default models.Card || model('Card', CardSchema);
