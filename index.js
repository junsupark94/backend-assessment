const express = require('express');

const app = express();
const port = 3000;

// Parsing
app.use(express.json());

// Router
const router = require('./routes.js');
// Set up our routes
app.use(router);

// Set up server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})