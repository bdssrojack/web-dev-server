// describe the structure of the data being stored in the database
import mongoose from "mongoose";
const schema = mongoose.Schema({
    tuit: String,
    likes: Number,
    postedBy: {
        username: String
    }
}, {collection: 'tuits'});
export default schema;