
// const { checkConnectDatabase } = require('./db');
const { checkConnectDatabase } = require('./config/dbConfig');
const { createServer } = require('./routes');

const app =  createServer();

checkConnectDatabase()

app.listen(3000, ()=> {
    console.log('listen in port 3000')
})