import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startLocation: {
            type: String,
            required: true,
        },
        endLocation: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        maxParticipants: {
            type: Number,
            required: true,
            min: 2,
        },

        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

        tags: {
            type: [String],
            default: [],
        },
        image: {
            type: String,
            default: '',
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true },
);

export const Event = mongoose.model('Event', eventSchema);
