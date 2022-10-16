
const express = require('express')
const ConnDB = require('./config/database')
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors');
// const customer = require('./routes/customer')
const app = express();
ConnDB();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());



const PORT = process.env.PORT ||   7000

// app.use('/api/v1',customer)

// const customerSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required: [true,'Please enter Name']
//     },
//     email:{
//         type:String,
//         required: [true,'Please enter Email'],
//         // unique:true
//     },
//     img:{
//         type:String,
        
        
//     }
// })
// const Customer = new mongoose.model("Customer",customerSchema)
// app.post("/api/v1/createcustomer",async(req,res) =>{

//     const cust = await Customer.create({
//         name:req.body.name,
//         email:req.body.email,
        
//     })
//     res.status(201).json(cust)
//     })
const routes = require('./routes/customer');

app.use('/api', routes)

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})