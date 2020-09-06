const express = require('express'); //missing node_modules, express not recognized
const cors = require('cors');
const proxy = require('express-http-proxy');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

//only want to proxy get request
app.use('/proxy', proxy('www.google.com', {
  filter: function(req, res) {
    return req.method == 'GET';
  }
}));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});

app.use('/images', proxy('http://localhost:3001', {
  proxyReqPathResolver: function (req) {
    //localhost:3000?10
    let pieces = req.url.split('?');
    console.log('💢', pieces);
    let queryString = pieces[1];
    let pathname = req.url.split('/')[1];
    console.log('🎏images pieces, queryString, pathname: ', pieces, queryString, pathname);
    if (!pathname) {
      return '/';
    } else {
      return `/${pathname}`;
    }
  }
}));


app.listen(PORT, () => {
  console.log(`proxy listening on port http://localhost:${PORT}`);
});