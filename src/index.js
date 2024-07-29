import express from 'express'
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express()

app.use(express.json());
const port = process.env.PORT || 3001;


app.get('/', (req , res)=>{
    res.status(201).send('Hello World')
});

app.get('/api/users', (req,res)=>{
    res.send([
        {id:8 , Name:"sumit" , College:"VCET"},
        {id:9 , Name:"Saurabh" , College:"TCET"}
    ])
})

app.get('/api/users/:id', (req,res)=>{
    const id = req.params.id;
    res.send({id , name:"sumit" , college:"VCET" , age:22})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
console.log("SUmit")