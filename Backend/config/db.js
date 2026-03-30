import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;