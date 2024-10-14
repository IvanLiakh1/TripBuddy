import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB is working");
    } catch (err) {
        console.error("DB error: ", err);
        process.exit(1);
    }
};

export default connectDB;
