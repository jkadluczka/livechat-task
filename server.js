const express = require('express');

const app = express();
require('./app/routes')(app);

app.listen(80, () => {
  console.log('Live on port 80');
});

module.exports = app;
