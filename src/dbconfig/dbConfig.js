import mongoose from "mongoose"

export default async function connect(){
    try{
        await mongoose.connect("mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/RSbuilder")
        // console.log(process.env.MONGO_URI)
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log('MongoDB connected');
        })
        connection.on('error', (err)=>{
            console.log('connection error ,  please make sure db is up and running: ' +err);
            process.exit()
        })
    }
    catch(error)
    {
        console.log("Something went wrong");
        console.log(error);
    }
}