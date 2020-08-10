import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import items from './routers/api/items.js';
import cors from 'cors';
import path from 'path';

import { mongoURI as db } from './config/key.js';

const app = express();

app.use(bodyParse.json());

app.use(cors())

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to mongo"))
    .catch(err => console.log(err));


app.use('/api/items/', items);

const port = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});