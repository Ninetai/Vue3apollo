const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const fs = require('fs');

const getJsonFile = (filePath, encoding = 'utf8') => {
  return new Promise(function getJsonFileImpl(resolve, reject) {
    fs.readFile(filePath, encoding, function readFileCallback(err, contents) {
      if(err) {
        return reject(err);
      }
      
      resolve(contents);
    });
  })
  .then(JSON.parse);
};

const { port } = require('./config');
const typeDefs = `
type Query {
  orders: [Order]
  order(id: ID!): Order
}

type Order {
  id: ID!
  name: String!
  sku: String!
  transaction_id: String!
  price: Float!
  transaction_status: String!
  date_paid: String!
  profit: Float!
  buyer_name: String!
  buyer_username: String!
  shipping_date: String!
}
`

const resolvers = {
  Query: {
    orders: async () => {
      const data = await getJsonFile('./data/orders.json')
      
      return data.orders
    },

    order: async (_, { id }) => {
      const data = await getJsonFile('./data/orders.json')
      const item = data.orders.find((order) => order.id === id)

      return item
    },
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express();

app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, function(){
  console.log('Server is running on Port:', port);
});