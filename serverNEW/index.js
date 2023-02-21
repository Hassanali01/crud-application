const express = require("express");
const app = express()
const env = require("dotenv")
const path = require('path')
const connectDB = require("./Connection/connection")
const multer = require ("multer")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")


const companiesroute = require('./Routes/Companies/Companies')
const departmentsRoute = require('./Routes/departments')





const cors = require("cors")
env.config()


app.use(cors());

// app.use(multer().none());

app.use(express.json());


//DB connection
connectDB();
//user image upload directory 


// app.use("/images", express.static(path.join(__dirname )));



app.use("/images", express.static(path.join(__dirname, "/images")));



//xlxs
//Routes 
app.use(bodyparser.urlencoded({extended:true}));
//multer image upload



// app.post("/upload", upload.single("logo"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });
//Routes
// app.use(require("./Routes/holiday"));

app.use('/companies',companiesroute);
app.use('/departments',departmentsRoute);


app.use((err,req,res,next)=>{
  console.log("i am middleware", req.body);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
})
//Port settings
const PORT = 7000;

app.listen(PORT,()=>{
  console.log(`app is listen at ${PORT}`)
})