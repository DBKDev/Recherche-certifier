const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

console.log('Environment Variables:', {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if(err){
        console.log(err.stack)
        return;
    } console.log(connection.threadId);
});

module.exports = connection;