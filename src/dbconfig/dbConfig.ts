import mongoose from "mongoose"

export async function connect(){
    try{
        if(process.env.MONGO_URI)
            mongoose.connect(process.env.MONGO_URI)
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