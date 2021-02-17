const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));
const port = 1001;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
