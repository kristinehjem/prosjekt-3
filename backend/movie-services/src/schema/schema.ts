//const _ = require('lodash');
const Movie = require('../models/movie.ts');

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
        imdbRating: { type: GraphQLString},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                console.log("movies root query");
                return Movie.find({})
            }
        },
        movie: {
            type: MovieType,
            resolve(parent, args) {
                console.log("movie root quert");
                return Movie.findbyId(args.id)
            }
        },
        yearMovies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                console.log("yearmovies root query");
                return Movie.find({year: args.year})
            }
        },
    }
});

// Mutation for writing to the database
/*const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    field: {
        addRating {
            type: MovieType,
            // Has to do some calculation to find the new imDbRating
            args: {
                imdbRating: {type: GraphQLString},
            },
            resolve(parent, args) {
                //TODO
            }
        }
    }
});*/

module.exports = new GraphQLSchema({
    query: RootQuery,
    //mutation: Mutation
});
