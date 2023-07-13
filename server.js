import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connection from './database/db.js';
import router from './routes/user-route.js';

const app = express();

dotenv.config();

app.use(cors());
app.use('/public',express.static('public'));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',router);

const PORT = process.env.PORT || 8071;

const URL = process.env.MONGODB_URI;

connection(URL);

app.listen(PORT, ()=>{
    console.log(`server is running at Port no. ${PORT}`);
});