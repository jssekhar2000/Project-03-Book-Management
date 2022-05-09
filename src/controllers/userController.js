const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');




//====================Create User Api=============================

const createUser = async function(req, res) {
    try {
        let data = req.body

        if(Object.keys(data).length == 0 ){
            return res.status(400).send({status:false ,msg:"BAD REQUEST,Please provide User details "});
          }


        let userData = await userModel.create(data)
        res.status(201).send({ status:true, data:userData })

    } catch (error) {
        res.status(500).send({status:false , msg: error.message});
    }
}



//=======================Login user=================================

const loginUser = async (req,res) => {
try{
     let data = req.body

     if(data.email && data.password){
         let user = await userModel.findOne({email:data.email , password:data.password})
         
         if(!user){
             res.status(400).send({status:false,msg:"Invalid Email or Password"})
         }

         let token = jwt.sign(
             {
                 userId: user._id.toString(),
                 iat: Math.floor(Date.now() / 1000),
                 exp: Math.floor(Date.now() / 1000)+ 10*60*60
                 },
                 "functionUp-Uranium" 
                 )
                 res.header("x-api-key" , token)
                 res.status(200).send({status:true , msg:"login Success" , data:token})
     }
}
catch(error){
    res.status(500).send({ status:false , msg:error.message});
}

}



module.exports.createUser= createUser;
module.exports.loginUser= loginUser;