const routes = require("./routes/movies_api.ts")
const mongoose = require("mongoose")
const express = require("express");
const cors = require("cors");
const app = express();
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
}

// source code for graphql + mongodb + apollo: https://github.com/iamshaunjp/graphql-playlist/tree/lesson-27

mongoose.connect('mongodb://admin:gruppe41@it2810-41.idi.ntnu.no:27017/movies')
mongoose.connection.on('connected', () => {
    console.log("Mongoose connected");
})
console.log("mongoose not connected b4?");

app.use(cors(options)) //To allow calls from frontend
app.use('/', routes)


// start the Express server
const port = 8081; // default port to listen
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    } 
);


