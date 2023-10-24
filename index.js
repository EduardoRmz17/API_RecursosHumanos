const morgan=require('morgan');
const express= require('express');
const app=express();

app.use(morgan('dev'));

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);


app.listen(process.env.PORT||3500,()=>{
    console.log("Server is running... ");
    
});
