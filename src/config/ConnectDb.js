import mongoose from "mongoose";

export const ConnectDb = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on('connected', ()=>{
            console.log("MongoDB connected");
        })

        mongoose.connection.on("error", (err)=>{
            console.log("MongoDB error" + err);
            process.exit();
        })
    } catch (error) {
        console.log(error);
    }
}