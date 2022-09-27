// import posts from "./resouces/tuits.js";
// let tuits = posts;
import * as tuitsDao from "../db/tuits-dao.js";



const createTuit = async (req, res) => {
    const newTuit = req.body;
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    // newTuit._id = (new Date()).getTime()+'';
    // newTuit.likes = 0;
    // tuits.push(newTuit);
    res.json(insertedTuit);
}

const findAllTuits = async (req, res) => {
    const tuits = await tuitsDao.findAllTuits()
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    // const tuitId = req.params.tid;
    // const updatedTuit = req.body;
    // tuits = tuits.map(t => t._id === tuitId ? updatedTuit : t);
    // res.sendStatus(200);
    const tuitIdToUpdate = req.params.tid;
    const updatedTuit = req.body;
    const status = await tuitsDao.updateTuit(tuitIdToUpdate, updatedTuit);
    res.send(status);
}

const deleteTuit = async (req, res) => {
    // const tuitId = req.params['tid'];
    // tuits = tuits.filter(t => t._id !== tuitId);
    // res.sendStatus(200);
    const tuitIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);
    res.send(status);
}


export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findAllTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}