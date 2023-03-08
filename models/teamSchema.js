const mongoose = require('mongoose');
CONNECTION = 'mongodb://127.0.0.1:27017/';
DATABASE_NAME = 'taskTracker';
COLLECTION_NAME = 'teams';

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION+DATABASE_NAME, (err, db)=>{
    if(err) console.log('mongoose error connecting')
});

const teamsSchema = {
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    members:[{
        type: String 
    }]
};

const teamModel = mongoose.model('teamsModel', teamsSchema, COLLECTION_NAME);

module.exports = {teamModel};                                                            