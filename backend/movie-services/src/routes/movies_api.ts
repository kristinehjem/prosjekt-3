const express = require("express")
const QueryModel = require("../models/queryModel.ts")

const router = express.Router();


router.get("/", async ( req, res ) => {
    try {
        let queryResult = await QueryModel.find({})
        console.log("queryResult", queryResult);
        res.send( queryResult )
    } catch (error) {
        console.log(error);
        res.send( error );
    }
});

module.exports = router;
