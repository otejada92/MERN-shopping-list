import express from 'express';
import mongoose from 'mongoose';
import items from './routers/api/items.js';
import users from './routers/api/user.js';
import auth from './routers/api/auth.js';
import cors from 'cors';
import path from 'path';
import config from './config/index.js';

const app = express();

app.use(cors());

app.use(express.json());

const { MONGO_URI, MONGO_DB_NAME } = config;
const mongoURI = `${MONGO_URI}/${MONGO_DB_NAME}`

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Connected to mongo"))
    .catch(err => console.log(err));

app.use('/api/items/', items);
app.use('/api/users/', users);
app.use('/api/auth/', auth);

if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


export default app;