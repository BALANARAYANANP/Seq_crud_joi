const Childss = require("../models/chilld");
const Parents = require("../models/parent");


async function postChild(req,res)  {

    // const id = Number(req.body)
    const {lname , age,parentId} = req.body
    console.log(lname ,age);
   try{
    const addChild = await Childss.create({
        lname:lname,
        age: age,
        parentId : parentId
     })

    if(addChild){
        res.status(201).send(addChild)
    }
    else{
        res.status(400).json({messae: "Could not add User"})
    }
    }catch(err){
        res.status(500).json({message : err.message})
   }
}

module.exports = postChild