const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
   if(req.body.password){
    req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedUser);
    }
        catch(err)
        {
res.status(500).json(err);
        }

});
 
router.get("/find/:id",  verifyTokenAndAdmin,async(req,res)=>{
    try {
        const user =await User.findByID(req.params.id);
        const{ password, ...others } =user._doc;

 
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=router