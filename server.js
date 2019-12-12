const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(`${__dirname}/`));
app.listen(process.env.PORT || 8080);
if (process.env.NODE_ENV === 'staging') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'));
  });
}

"engines": {
  "node": "12.13.1",
  "yarn": "1.19.2"
},
