import { Schema, model, Types } from 'mongoose';

const sneakersSchema = new Schema({
    brand: {
        type: String,
        required: true,
        minlength: [3, 'Brand name must be at least 3 characters long'],
    },
    model: {
        type: String,
        required: true,
        minlength: [3, 'Model name must be at least 3 characters long'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
    },
    size: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d+(\.\d+)?$/.test(value);
            },
            message: 'Size must be a number',
        },
    },
    condition: {
        type: String,
        required: true,
        minlength: [3, 'Condition must be at least 3 characters long'],
    },
    year: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{4}$/.test(value);
            },
            message: 'Year must be a 4-digit number',
        },
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxLength: [150, 'Description must be at most 150 characters long'],
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(http|https):\/\//.test(value);
            },
            message: 'Image URL must be a valid URL',
        },
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: [Types.ObjectId],
        ref: 'User',
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Sneakers = model('Sneakers', sneakersSchema);

export default Sneakers;