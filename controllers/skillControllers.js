
const Skill = require("../models/skill");
const ParentSkill = require('../models/ParentSkill')


async function postSkill(req,res)  {

    const {skillNames, parentId} = req.body
    
   try{
    const skills = await Promise.all(
        skillNames.map(name =>
          Skill.findOrCreate({ where: { name }}).then(([skill]) => skill)
        )
      );

      for (const skill of skills) {
            const ps = await ParentSkill.create({
              parentId: parentId,
              skillId: skill.id
   })}

    if(skills){
        res.status(201).send(skills)
    }
    else{
        res.status(400).json({messae: "Could not add User"})
    }
    }catch(err){
        res.status(500).json({message : err.message})
   }
}

module.exports = postSkill


