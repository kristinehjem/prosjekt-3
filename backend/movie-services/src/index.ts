// const api = require("./routes/index.ts")
// import { movies_api } from "./routes/movies_api";
// Access-Control-Allow-Origin: http://localhost:3000

const cors = require("cors");
const express = require("express")
const movies_api = require("./routes/movies_api.ts")
const app = express();
const port = 8081; // default port to listen
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
}
app.use(cors(options)) //To allow calls from frontend



// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );
// movies_api(app)
// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} 

);


