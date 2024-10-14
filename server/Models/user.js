import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    eventsAttended: {
        type: Number,
        default: 0,
    },
    tags: [
        {
            type: String,
        }
    ],
    bio: {
        type: String,
        trim: true,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
export const User = mongoose.model('User', userSchema);



