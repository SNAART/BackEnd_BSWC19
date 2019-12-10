'use strict';
const express = require('express');
const catRoute= require('./routes/catRoute');
const userRoute= require('./routes/userRoute');
const loginRoute= require('./routes/loginRoute');
const cors = require('cors');

const port = 3000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('uploads'));
app.use('/thumbnails',express.static('thumbnails'));
app.use('/cat', catRoute);
app.use('/user', userRoute);
app.use('/auth', loginRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//john@metropolia.fi