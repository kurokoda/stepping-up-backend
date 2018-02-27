const express = require('express');
const path    = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'frontend/build')));
console.log(__dirname);

app.get('/api/foo', (req, res) => {
  res.send('Foo has been sent')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'frontend/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`app listening on ${port}`);
