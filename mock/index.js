const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('./utils/cors');

app.use(express.json()); //接收 json 資料
app.use(express.urlencoded({ extended: false })); //接收 form urlencoded 的資料
//CORS問題
app.use('/*', cors);

app.use("/*", ((res, req, next) => {
    next()
}));


const test = require("./routers/test");
app.use('/api', test);


app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`))