const model = require('../models/teamSchema');
const jwt = require('jsonwebtoken')
let addMemberToTeam = async (req, res)=>{
    try{
        console.log('inside add member to team')
        let empId = req.params.empID;
        let teamname = req.params.teamname;
        filter = {teamName: teamname};
        updateQuery = {$push: {members: empId}};
        await model.teamModel.updateOne(filter, updateQuery);
        res.status(200).json('Added the team member to the team');

    }catch(error){
        console.log(error)
        res.status(404).send('Error in adding members to team'+ error)
    }
}

let retrieveAllTeams =  async (req, res)=>{
    try{
        let data = await model.teamModel.find();
        res.status(200).json(data);
    }catch(err){
        res.status(404).send('Error retrieving all teams');
    }

}

let createATeam = async (req, res)=>{
    try{
        console.log(req.body);
        await model.teamModel.create({'teamName': req.body.teamName, 'members': req.body.members});
        res.status(200).json('Created a team successfully');
    }catch(err){
        res.status(404).send('Error in creating a team '+err);
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

module.exports = {validateJWT, addMemberToTeam, retrieveAllTeams, createATeam};