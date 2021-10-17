const _ = require('lodash');
const Movie = require('../modles/movie');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
} = require('graphql');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString},
        rank: { type: GraphQLString},
        title: { type: GraphQLString},
        year: { type: GraphQLString},
        image: { type: GraphQLString},
        imDbRating: { type: GraphQLString},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        },
        movie: {
            type: MovieType,
            args: {
                year: { type: GraphQLString}
            },
            resolve(parent, args) {
                //TODO
            }
        }
    }
});

// Mutation for writing to the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    field: {
        addRating {
            type: MovieType,
            // Has to do some calculation to find the new imDbRating
            args: {
                imDbRating: {type: GraphQLString},
            },
            resolve(parent, args) {
                //TODO
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
