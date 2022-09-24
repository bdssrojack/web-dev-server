import static_users from './resouces/users.js';  // import the array of users

let users = static_users;

const userController = (app) => {  // use express instance app to declare HTTP GET request pattern /api/users to call a function
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findAllUsers = (req, res) => {  // function runs when /api/users requested
    // const type = req.query.type;// retrieve type parameter from query
    const type = req.query['type']; //equivalent syntax
    if(type){  // if type parameter in query
        res.json(findUsersByType(type));  // find all users of that type and respond
        return;  // return so it doesn't continue
    }
    res.json(users);  // responds with array of users
}

const findUsersByType = (type) => {
    return users.find(u => u.type === type);
}

const findUserById = (req, res) => {
    const userId = req.params.uid; // or req.params["uid"]
    const user = users.find(u => u._id === userId);
    res.json(user);
}

// read data posted to the server, embedded in the HTTP request body,
// and interpret it as a new user and stores in the users array.
const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr => usr._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updatedUser = req.body;
    users = users.map(usr =>
        usr._id === userId ?
            updatedUser :
            usr);
    res.sendStatus(200);
}



export default userController;  // exports so server.js can import