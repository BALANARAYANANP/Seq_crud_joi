const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const seedUsers = require('./seeders/seeder'); 
const {upload} = require('./upload')
const path = require('path')
const multer = require('multer')
const ParentSkill = require('./models/ParentSkill')
const Parents = require('./models/parent')
const Childss = require('./models/chilld')
const Profile = require('./models/profiles')
const Skill = require('./models/skill')
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

Parents.hasMany(Childss, { foreignKey: 'parentId' });
Childss.belongsTo(Parents, { foreignKey: 'parentId' });

Parents.hasOne(Profile, { foreignKey: 'parentId' , as : 'profile'});
Profile.belongsTo(Parents, { foreignKey: 'parentId', as : 'part' })

Parents.belongsToMany(Skill, {
  through: ParentSkill,
  foreignKey: 'parentId',
  as: 'skills'

});
Skill.belongsToMany(Parents, {
  through: ParentSkill,
  foreignKey: 'skillId',
  as: 'parents' 
});

const folderpath = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(folderpath))

app.post('/upload/file', upload.single("image") , (req,res)=>{
    res.send({message : "file uploaded", data: req.file})
})
app.post('/upload/files', upload.array("images" , 10) , (req,res)=>{
    res.json({message: "files uploaded", data: req.files})
})

app.get('/', (req,res)=>{
    res.send("App is Running")
})

app.use((err,req,res,next) =>{
    if(err instanceof multer.MulterError)
        switch (err.code){ 
            case 'LIMIT_FILE_SIZE' :
                return res.status(400).send({message :"File size is more than 1 MB"})
            default:
                return res.status(400).send(`multer error ${err.message}`) 
                 }
    else{
        res.status(400).json({message: err.message})
    }

})





async function startServer() {
  try {
    await sequelize.sync(); 
    console.log(' Database synced.');

    await seedUsers();

    app.listen(3000, () => {
      console.log(' Server running at http://localhost:3000');
    });

  } catch (err) {
    console.error(' Failed to start server:', err);
  }
}

startServer();
