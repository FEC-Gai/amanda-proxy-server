const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '/../public')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});

// //only want to proxy get request
// app.use('/proxy', proxy('www.google.com', {
//   filter: function(req, res) {
//     return req.method == 'GET';
//   }
// }));

// app.use('/images', proxy('http://localhost:3001', {
//   proxyReqPathResolver: function (req) {
//     //localhost:3000/?10
//     //console.log('req.url: ', req.url);
//     let pieces = req.url.split('?');
//     let pathname = pieces[0];
//     let queryString = pieces[1];
//     if (!queryString) {
//       return '';
//     } else {
//       return `${pathname}?${queryString}`;
//     }
//   }
// }));


app.listen(PORT, () => {
  console.log(`proxy listening on port http://localhost:${PORT}`);
});