const model = require('../models/membersSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//access point /members
let getAllMembers = async (req, res)=>{
    try{
        let data = await model.memberModel.find()
        res.status(200).json(data);
    }catch(err){
        res.status(404).send('Error retrieving all members');
    }
}
let createAMember = async (req, res)=>{
    console.log('inside create a member')
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    try{
        let empid = req.body.empid;
        let username = req.body.username;
        let pwd = req.body.password;
        let data = await model.memberModel.create({
            empId: empid,
            username: username,
            password: pwd,
            admin: req.body.isAdmin
        });
        res.status(200).json('Successfully created a member');

    }catch(err){
        res.status(404).send('Error to create a member'+ err);
    }
}

//access point  /members/:username
let getASpecificMember = async (req, res)=>{
    try{
        let uname = req.params.username;
        let data = await model.memberModel.findOne({username: uname});
        console.log(data);
        res.status(200).json(data);
    }catch(err){
        res.status(404).send('Error in retrieving the member by username!');
    }
}

let assignANewTaskToMember = async (req, res)=>{
    try{
        let uname = req.params.username;
        findQuery = {username: uname};
        updateQuery = {tasks: {taskName: req.body.taskName, completed: req.body.completed}};
        await model.memberModel.updateOne(findQuery, {$push: updateQuery});
        res.status(200).json('Successfully added task for the user');

    }catch(err){
        console.log(err)
        res.status(404).send('Error in assigning task to the user '+req.params.username);
    }
}

let updateMemberInfo = async (req, res)=>{
    try{
        let dataToUpdate = req.body;
        let uname = req.params.username;
        findQuery = {username: uname};
        await model.memberModel.updateOne(findQuery, {$set : dataToUpdate});
        res.status(200).send('Successfully updated member info');
    }catch(err){
        res.status(404).send('Error in upodating members info');
    }
}

let deleteAMember = async (req, res)=>{
    try{
        let uname = req.params.username;
        await model.memberModel.deleteOne({username: uname});
        res.status(200).json('Successfully removed the member');
    }catch(err){
        res.status(404).send('Error while deleting the member info')
    }
}

//accesspoint  /members/:empID/:taskname
let editTaskCompletion = async (req, res)=>{
    try{
        let empid = req.params.empID;
        let taskname = req.params.taskname;
        await model.memberModel.updateOne({empId: empid, 'tasks.$.taskname': taskname}, {$set: {'tasks.$.completed' : req.body.completed}} );
        res.status(200).json('Successfully edited the completion status');
    }catch(err){
        res.status(404).send('Error to edit completion status')
    }
}

//accesspoint /members/login
let login = async(req, res)=>{
    const user = await model.memberModel.findOne({"username": req.body.username});
    if(user !== null){
        const result = bcrypt.compareSync(req.body.password, user.password);
        if(result){
            const token = jwt.sign({_id: user._id}, 'topsecret', {
                expiresIn: '300 seconds'
            });
            res.cookie('token', token);
            res.status(200).json(user);
            console.log('User valid')
        }else{
            res.status(200).send(null);
            console.log('password invalid')
        }
    }else{
        res.status(400).send(null);
    }
}
let validateJWT = (req, res, next) => {
    jwt.verify(req.cookies.token, 'topsecret', (err,data)=>{
        if(err){
            res.cookie('token','')
            res.status(500).json('Session is expired. Please login again.')
        }
        
        next()
    })
}

module.exports = {validateJWT, login, getAllMembers, createAMember, editTaskCompletion, deleteAMember, updateMemberInfo, assignANewTaskToMember, getASpecificMember}