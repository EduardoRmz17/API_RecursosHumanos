const morgan=require('morgan');
const express= require('express');
const app=express();
//ROUTES
const employees=require("./routes/employees")
app.use(morgan('dev'));
//MIDDLEWARE
const auth= require('./middleware/autorizacion');
const notFound=require('./middleware/noEncontrado');
//const cors=require("./middleware/cors");
const cors = require("cors");


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employees",employees);
app.use(auth);
app.use(notFound);

app.listen(process.env.PORT||3500,()=>{
    console.log("Server is running... ");
    
});
