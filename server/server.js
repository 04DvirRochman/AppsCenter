const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const path = require('path');
const app = express();
app.use(express.json());
const dataBase = require("./database.js");

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static('C:/dev/AppsCenter/client'));

app.get('/', (req, res) => {
    res.sendFile('C:/dev/AppsCenter/client/views/mainPage.html');
});

app.get("/api/apps", async (req, res) => {
    let toSend = await dataBase.getAll();
    res.send(toSend);
});

app.get("/api/search/:name", async (req, res) => {
    let toSend = await dataBase.searchByName(req.params.name);
    res.send(toSend);
});

app.get('/api/apps/:id', async (req, res) => {
    const app = await dataBase.getById(req.params.id);
    if (!app) {
        res.status(404).send('the apps with the given id was not found');
        return;
    }
    res.send(app);

});

app.put('/api/apps', async (req, res) => {
    const app = req.body;
    console.log("got app:", app);
    const validatErrors = validateApp(app).error;
    if (validatErrors) {
        console.log("error:", validatErrors.details[0].message);
        res.status(400).send(validatErrors.details[0].message);
        return;
    }
    await dataBase.edit(app);
    console.log("edited app:", app);
    res.send(`editd app: ${app}`);
});

app.delete('/api/apps/:id', async (req, res) => {
    console.log("trying to delete:", req.params.id);
    await dataBase.deleteById(req.params.id);

    console.log("deleted:", req.params.id);
    res.send(`deleted app: ${req.params.id}`);

});


app.post('/api/apps', async (req, res) => {
    const app = req.body;
    console.log("got app:", app);
    const validatErrors = validateApp(app).error;
    if (validatErrors) {
        console.log("error:", validatErrors.details[0].message);
        res.status(400).send(validatErrors.details[0].message);
        return;
    }
    await dataBase.add(app);
    console.log("added app:", app);
    res.send(`added app: ${app}`);
});

function validateApp(app) {
    const schema = Joi.object({
        id: Joi.number(),
        imageUrl: Joi.string().max(300).allow(''),
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().min(0),
        desc: Joi.string().max(500).allow(''),
        companyName: Joi.string().max(30).allow(''),
        createdAt: Joi.date().allow('')
    });
    return schema.validate(app);
}

const port = 4000;
app.listen(port);
console.log('listening... port:', port);