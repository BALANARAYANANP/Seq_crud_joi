const User = require('../models/user');
const sequelize = require('../config/database');
const Childss = require('../models/chilld');
const Parents = require('../models/parent');
const ParentSkill = require('../models/ParentSkill');
const Profile = require('../models/profiles');
const Skill = require('../models/skill');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
    try{
  const users = await User.findAll();
  if(users)
    res.status(200).json(users);

    }catch(err){
        res.status(404).json({message : err.message})
    }
};

exports.getUserById = async (req, res) =>
  
  {
  try{
  const user = await User.findByPk(req.params.id);
  if (user) 
    res.json(user);
  }catch(err){
   res.status(404).json({ error: 'User not found' });
  }
};

exports.updateUser = async (req, res) => {
  
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else res.status(404).json({ error: 'User not found' });
};

exports.deleteUser = async (req, res) => {
  try{
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } }
  catch(err) 
  {res.status(404).json({ error: 'User not found' });
}};



exports.createParentAndChild = async (req, res) => {
  const {  c , prof, skillNames} = req.body;
  // console.log(skillNames)

  const t = await sequelize.transaction();
  try {
  //     // Step 1: Create parent
  //     const parent = await Parents.create({

  //         fname : p.fname,
  //         age: p.age

  //     }, { transaction: t }); 

      const child = await Childss.create({
        lname: c.lname,
        age: c.age,
       
      }, { transaction: t });

      const profile = await Profile.create({

          bio : prof.bio,
          address : prof.address,
          // parentId: parent.id, 
      }, {transaction : t } );
      
      const skills = await Promise.all(
          skillNames.map(name =>
            Skill.findOrCreate({ where: { name }, transaction: t }).then(([skill]) => skill)
          )
        );
      
        for (const skill of skills) {
          const ps = await ParentSkill.create({
            // parentId: parent.id,
            skillId: skill.id
          }, { transaction: t });
        }
        

      await t.commit(); 
      

      res.status(200).send({
          message: 'All tables Create Succuessfully',
          // parent,
          child, profile , skills 
      });
  } catch (err) {
      await t.rollback(); 
      console.log("Error Occurred: " + err.message);
      res.status(500).send({ error: err.message });
  }
};
// exports.getParentAndChild = async (req, res) => {
//   try {
//     console.log("Request received for getParentAndChild");

//     const result = await Parents.findAll();

//     // console.log("Result from DB:", JSON.stringify(result, null, 2));

//     return res.status(200).json(result);
//   } catch (err) {
//     console.error("Error in getParentAndChild:", err);
//     return res.status(500).json({ message: "Error on Fetching Details" });
//   }
// };
