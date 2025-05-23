const Profile = require("../models/profiles")


async function postProfile(req,res)  {

    // const id = Number(req.body)
    const {bio , address, parentId} = req.body
   try{
    const addProfile = await Profile.create({bio:bio , address:address, parentId:parentId})

    if(addProfile){
        res.status(201).send(addProfile)
    }
    else{
        res.status(400).json({messae: "Could not add Profile"})
    }
    }catch(err){
        res.status(500).json({message : err.message})
   }
}

module.exports = postProfile