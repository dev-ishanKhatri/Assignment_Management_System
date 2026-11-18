import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/assignmentDB");
        console.log("Mongodb Comnnection Successfull");
        
    } catch (error) {
        console.log(error);
        
    }
};

export default connectDB;

