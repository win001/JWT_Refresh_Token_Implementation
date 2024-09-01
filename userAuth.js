const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');

users = [];


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/sign-up', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = { username: req.body.username, password: hashedPassword };
        users.push(user);
        res.status(201).send();
        console.log(users);
    } catch {
        res.status(500).send();
    }
});


app.post('/user/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});