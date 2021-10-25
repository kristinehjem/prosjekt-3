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
        imdbRatingCount: {type: GraphQLString},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent, args) {
                console.log("movie root query");
                return Movie.findOne({id: args.id});
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: {
                title: {type: GraphQLString},
                years: {type: GraphQLList(GraphQLString)},
                sort: {type: GraphQLString},
            },
            resolve(parent, args) {
                console.log("movies root query");
                //if sort is an empty string, the data will not be sorted by title, but by rank which is default
                if (args.sort === "") {
                    if (args.years.length === 0) {
                        return Movie.find({title: {$regex: new RegExp(args.title, "i")}});
                    }
                    //makes the years filter a regexp to be able to find all movies in a given decade
                    let filters = args.years.map((filter) => new RegExp(filter));
                    return Movie.find({title: {$regex: new RegExp(args.title, "i")},
                                        year: {$in: filters}});

                }
                if (args.years.length === 0) {
                    return Movie.find({title: {$regex: new RegExp(args.title, "i")}}).sort({title: 1});
                }
                //makes the years filter a regexp to be able to find all movies in a given decade
                let filters = args.years.map((filter) => new RegExp(filter));
                return Movie.find({title: {$regex: new RegExp(args.title, "i")},
                                    year: {$in: filters}}).sort({title: 1});

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
                // source: https://stackoverflow.com/questions/48436366/how-to-make-update-mutation-graphql-plus-mongodb
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
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
