const express = require("express");
const app= express();
const mongoose = require("mongoose");
const  dotenv=require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const scoreRoute = require("./routes/score")
dotenv.config();
mongoose.connect(
    process.env.MONGO_URL
).then(()=>console.log("DBConnection  Succesfull!")).catch((err)=>{
    console.log(err);
});

    app.get("/api/test",()=> {
        console.log("test is succesfull");
    });
    app.use(express.json());
    app.use("/api/users",userRoute);
    app.use("/api/auth",authRoute);
    app.use("/api/score",scoreRoute);

app.listen(process.env.PORT|| 5000,()=>{
    console.log("backend server is running!");
});
