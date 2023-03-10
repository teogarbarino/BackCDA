const Score = require("../models/Score");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();
router.put("/score",verifyTokenAndAuthorization,async (req,res)=>{
     try{
        const newScore= new Score({
            username: req.body.username,
            score:req.body.score,
    
        });




         res.status(200).json(updatedUser);
     }
         catch(err)
         {
 res.status(500).json(err);
         }
 
 });