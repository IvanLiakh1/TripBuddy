import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsAllowInvalidCertificates: true,
        });
        console.log('DB is working');
    } catch (error) {
        console.error('DB error:', error);
        process.exit();
    }
};

export default connectDB;
