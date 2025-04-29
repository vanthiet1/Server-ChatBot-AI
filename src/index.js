const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/index');
dotenv.config();

const app = express();
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Hello World!');
})

app.use("/api/v1",router)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
