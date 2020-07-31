const express = require('express');

const app = express();
require('./app/routes')(app);

app.listen(8000, () => {
  console.log('Live on port 8000');
});
