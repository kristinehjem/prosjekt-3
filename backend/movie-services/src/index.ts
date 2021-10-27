import routes from "./routes/movies_api";
import * as mongoose from "mongoose";
import * as express from "express";
import * as cors from "cors";
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

app.use(cors(options)) //To allow calls from frontend
app.use('/', routes)


// start the Express server
const port = 8081; // default port to listen
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    } 
);


