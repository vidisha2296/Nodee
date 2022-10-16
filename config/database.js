const mongoose = require('mongoose')

const ConnDB = () =>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("Connect to mongodb")
    }).catch((err)=>{
      console.log(err)
    })
}
module.exports = ConnDB;