const mongoose = require('mongoose');
const config = require("config");
//connecting a database on atlas
const connectDB=()=>{
    mongoose.connect(config.get("MONGOURI"),{ useUnifiedTopology: true,useNewUrlParser: true,    useCreateIndex: true, 
    })
    .then(()=>console.log("database connected"))
    .catch(()=>console.log("error DB"))
}


module.exports=connectDB