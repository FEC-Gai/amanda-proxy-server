const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '/../public')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});



app.listen(PORT, () => {
  console.log(`proxy listening on port http://localhost:${PORT}`);
});