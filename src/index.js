const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const app = express();
const router = require('./router/index');
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Hello World!');
})
app.use("/api/v1",router)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
