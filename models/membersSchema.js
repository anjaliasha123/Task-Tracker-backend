const mongoose = require('mongoose');
CONNECTION = 'mongodb://127.0.0.1:27017/';
DATABASE_NAME = 'taskTracker';
COLLECTION_NAME = 'members';

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION+DATABASE_NAME, (err, db)=>{
    if(err) console.log('mongoose error connecting')
});

const memberSchema = {
    empId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        taskName: {type: String},
        completed: {type: Boolean}
    }],
    teams: [{
        teamName: {type: String}
    }],
    admin:{
        type: Boolean,
        default: false
    }
};

const memberModel = mongoose.model('membersModel', memberSchema, COLLECTION_NAME);
module.exports = {memberModel};