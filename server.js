const express = require('express');

const app = express();
const port = 1001;

app.get('/', (req, res) => {
  res.json({ test: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
