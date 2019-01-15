const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const schemas = require('./schemas');
const middleware = require('./middleware');

var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/blog', middleware(schemas.blogPOST, 'body') ,function (req, res) {
  console.log('/update');

  res.json(req.body);
});

app.get('/products', middleware(schemas.blogLIST, 'query'), function (req, res) {
  console.log('/products');

  const { page, pageSize } = req.query;
  res.json(req.query);
});

app.get('/products/:id', middleware(schemas.blogDETAIL, 'params'), function(req, res) {
  console.log("/products/:id");
  const { id } = req.params;
  res.json(req.params);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

