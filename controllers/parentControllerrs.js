const Childs = require("../models/chilld")
const Profile = require("../models/profiles")
const Parents = require("../models/parent")
const Skill = require("../models/skill")
const ParentSkill = require('../models/ParentSkill')


async function postParent(req, res) {

    // const id = Number(req.body)
    const { fname, age } = req.body
    try {
        const addParent = await Parents.create({ fname, age })

        if (addParent) {
            res.status(201).send(addParent)
        }
        else {
            res.status(400).json({ messae: "Could not add User" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// one many

async function getParent(req, res) {
    try {
        const result = await Parents.findAll({include:{model:Childs}});
        console.log(result)
        if (result) {
            res.status(200).send(result)
        }
        else {
            res.status(404).json({ Message: "User not Found" })
        }

    } catch (err) {
        res.status(401).json({ "Message": err.message })
    }
}

// many to many

async function getMany (req,res){
    try{
        const result = await Parents.findAll({include:{model : Skill,as: 'skills',  through: {
            model: ParentSkill,
            attributes: [] 
        } }})
        console.log(result)
        if (result) {
            res.status(200).send(result)
        }
        else {
            res.status(404).json({ Message: "User not Found" })
        }
        
    }catch (err) {
        res.status(401).json({ "Message": err.message })
    }
}

// one to one


async function getone2one(req, res) {
    try {
        const result = await Parents.findAll({
            include: {
                model: Profile,
                as: 'profile' 
            }
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ Message: err.message });
    }
}



module.exports = { postParent, getParent , getMany , getone2one}