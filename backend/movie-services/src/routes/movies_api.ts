const express = require("express")
const MovieModel = require("../models/movie.ts");
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema.ts');

const router = express.Router();


router.post("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

module.exports = router;
