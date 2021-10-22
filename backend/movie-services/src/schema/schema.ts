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
        id: { type: GraphQLString },
        rank: { type: GraphQLString },
        title: { type: GraphQLString },
        year: { type: GraphQLString },
        image: { type: GraphQLString },
        imdbRating: { type: GraphQLString },
        imdbRatingCount: { type: GraphQLString },
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            resolve(parent, args) {
                console.log("movie root query");
                return Movie.findbyId(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: {
                title: { type: GraphQLString },
                years: { type: GraphQLList(GraphQLString) },
                offset: { type: GraphQLInt },
                limit: { type: GraphQLInt }

            },
            async resolve(parent, args) {
                console.log("movies root query");
                let condition = {};
                if (args.title !== "") {
                    condition = {
                        title: { $regex: new RegExp(args.title, "i") }
                    }
                }
                if (args.years.length > 0) {
                    let filters = args.years.map((filter) => new RegExp(filter));
                    let yearFilterCondition = { year: { $in: filters } };
                    condition = Object.assign(condition, yearFilterCondition)
                }
                try {
                    console.log(condition);
                    const res = await Movie.paginate(condition, { offset: args.offset, limit: args.limit })
                    return res.docs;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
        }
    },
});

// Mutation for writing to the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserRating: {
            type: MovieType,
            args: {
                title: { type: GraphQLString },
                imdbRating: { type: GraphQLString },
                imdbRatingCount: { type: GraphQLString },
            },
            resolve(parent, args) {
                console.log("Mutation");
                // source: https://stackoverflow.com/questions/48436366/how-to-make-update-mutation-graphql-plus-mongodb
                return new Promise((resolve, reject) => {
                    Movie.findOneAndUpdate(
                        { "title": args.title },
                        { "$set": { imdbRating: args.imdbRating, imdbRatingCount: args.imdbRatingCount } },
                        { "new": true } // returns
                    ).exec((err, res) => {
                        if (err) reject(err)
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
