const Movie = require('../models/movie.ts');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
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
        imdbRatingCount: {type: GraphQLString},
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
            args: {
                year: {type: GraphQLString}
            },
            resolve(parent, args) {
                console.log("yearmovies root query");
                return Movie.find({year: args.year});
            }
        },
    }
});

// Mutation for writing to the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserRating: {
            type: MovieType,
            args: {
                title: {type: GraphQLString},
                imdbRating: {type: GraphQLString},
                imdbRatingCount: {type: GraphQLString},
            },
            resolve(parent, args) {
                console.log("Mutation");
                return new Promise((resolve, reject) => {
                    Movie.findOneAndUpdate(
                        {"title": args.title},
                        {"$set": {imdbRating: args.imdbRating, imdbRatingCount: args.imdbRatingCount}},
                        {"new": true} // returns
                    ).exec((err, res) => {
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
                //return Movie.updateOne({title: args.title}, {imdbRating: args.imdbRating, imdbRatingCount: args.imdbRatingCount} )
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
