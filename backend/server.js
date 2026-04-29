const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const connectToDatabase = require('./db');
const show = require('./table');

app.use(cors());
app.use(express.json());

const addroute = require('./add');
const deleteroute = require('./delete');

app.use(addroute);
app.use(deleteroute);

async function startserver() {
     await connectToDatabase();
     await show();
     app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
     });
}

startserver();

