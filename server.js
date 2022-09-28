// implements an HTTP server that responds Hello World! when the server receives an HTTP request to http:/ localhost:4000/hello.

//const express = require('express'); //require = import
import express from 'express';//enable ES6 syntax by adding "type": "module" in package.json
import cors from 'cors';
import helloController from "./controllers/hello-controller.js";
import userController from "./controllers/user-controller.js";
import tuitsConstroller from "./controllers/tuits-constroller.js";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/webdev';
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb+srv://bdssrojack:lzs19980118@cluster0.axah5bk.mongodb.net/?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost:27017/webdev");

const app = express(); //This call creates an instance of the express library and assigns it to local variable app
app.use(cors());
app.use(express.json()); // parse JSON from HTTP request body using a JSON middleware, All requests will first go through this middleware parsing HTTP body into a JSON object added to the request object in a new body property that later HTTP handlers can access.
helloController(app);
userController(app);
tuitsConstroller(app);
app.listen(process.env.PORT || 4000);
