const express = require('express');
const routes = require ('./app/routes')

const app = express();
routes(app);

//Running server on port 8000
app.listen(8000, () => {
  console.log('Live on port 8000');
});

module.exports = app;
