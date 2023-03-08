//constants
PORT = 3000;
DATABASE_NAME = 'taskTracker';
COLLECTION1_NAME = 'teams';
COLLECTION2_NAME = 'members';
CONNECTION = 'mongodb://127.0.0.1:27017/';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type','Application/JSON')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
//routers
const teamRouter = require('./routes/teamsRoutes');
const membersRouter = require('./routes/memberRoutes');
app.use('/teams', teamRouter.router);
app.use('/members', membersRouter.router);


app.listen(PORT, ()=>{
    console.log('Listening to post ',PORT);
})