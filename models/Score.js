const mongoose = require("mongoose");
const {boolean}= require("webidl-conversions");


const ScoreSchema = new  mongoose.Schema(
    {
        username:{ type : String, required:true, unique: true},
        score:{type:array},
    },
    {timestamps:true}

);
module.exports= mongoose.model("Score",ScoreSchema);