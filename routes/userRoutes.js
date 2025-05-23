const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
const { userSchema } = require('../validators/userValidator');
// const {getParent} = require('../controllers/userController');
const {postParent} = require('../controllers/parentControllerrs');
const postChild = require('../controllers/childContrller');
const postProfile = require('../controllers/profileController');
const postSkill = require('../controllers/skillControllers');
// const createParentAndChild = require('../controllers/userController')
const {getMany} = require('../controllers/parentControllerrs')
const {getParent} =require('../controllers/parentControllerrs')
const {getone2one} = require('../controllers/parentControllerrs')
router.post('/', validate(userSchema), userController.createUser);
router.get('/', userController.getAllUsers);


router.post('/new', userController.createParentAndChild);
router.post('/postParent',postParent)
router.post('/postChild', postChild)
router.post('/postProfile', postProfile)
router.post('/postSkill' , postSkill)
router.get('/getParent',getParent)
router.get('/getmany', getMany)
router.get('/one', getone2one)
router.get('/:id', userController.getUserById);
router.put('/:id', validate(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
