const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const DbConnect = require('./config/db');

//Body Parser
app.use(express.json({extended:true}));

//Mongo Db Connect
DbConnect();
app.use(cors());
//Define routes
app.use("/api/auth",require('./router/Auth'));
app.use("/api/users",require('./router/Users'));
app.use("/api/profile",require('./router/Profile'));
app.use("/api/posts",require('./router/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`App running at port ${PORT}`)});