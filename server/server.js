const express = require('express');
const cors = require('cors');
const path = require('path');
const proxy = require('express-http-proxy');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/../public')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});

//proxy get request
app.use('/proxy', proxy('www.google.com', {
  filter: function(req, res) {
    return req.method == 'GET';
  }
}));

app.use('/images', proxy('http://ec2-3-21-170-25.us-east-2.compute.amazonaws.com', {
  proxyReqPathResolver: function (req) {
    let pieces = req.url.split('?');
    let pathname = pieces[0];
    let queryString = pieces[1];
    if (!queryString) {
      return '';
    } else {
      return `${pathname}?${queryString}`;
    }
  }
}));

app.use('/pricing', proxy('http://54.187.6.96:3003', {
  proxyReqPathResolver: function (req) {
    let pieces = req.url.split('?');
    let pathname = pieces[0];
    let queryString = pieces[1];
    if (!queryString) {
      return '';
    } else {
      return `${pathname}?${queryString}`;
    }
  }
}));

app.use('/rooms', proxy('http://ec2-54-215-129-94.us-west-1.compute.amazonaws.com:3002', {
  proxyReqPathResolver: function (req) {
    let pieces = req.url.split('?');
    let pathname = pieces[0];
    let queryString = pieces[1];
    if (!queryString) {
      return '';
    } else {
      return `${pathname}?${queryString}`;
    }
  }
}));

app.use('/hostInfo', proxy('http://ec2-54-215-129-94.us-west-1.compute.amazonaws.com:3006', {
  proxyReqPathResolver: function (req) {
    let pieces = req.url.split('?');
    let pathname = pieces[0];
    let queryString = pieces[1];
    if (!queryString) {
      return '';
    } else {
      return `${pathname}?${queryString}`;
    }
  }
}));



app.listen(PORT, () => {
  console.log(`proxy listening on port http://localhost:${PORT}`);
});