const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors');
app.use(express.json());

const fs = require('fs');

let applications = [
    {
        id: 1,
        imageUrl: "facebook.png",
        name: "Facebook",
        price: 2.99,
        desc: "To see whats new in your friends life!",
        companyName: "Facebook"
    },
    {
        id: 2,
        imageUrl: "twitter.png",
        name: "Twitter",
        price: 5,
        desc: "To see whats new in your friends life!",
        companyName: "TwitterC"
    },
    {
        id: 3,
        imageUrl: "instagram.jpg",
        name: "Instagram",
        price: 2,
        desc: "To talk with your friends!",
        companyName: "Instagram"
    },
    {
        id: 4,
        imageUrl: "waze.png",
        name: "waze",
        price: 6.66,
        desc: "To go to see your friends!",
        companyName: "Israel"
    },
    {
        id: 5,
        imageUrl: "Whatsapp.png",
        name: "Whatsapp",
        price: 7,
        desc: "To talk to your friends!",
        companyName: "facebook"
    },
    {
        id: 6,
        imageUrl: "getTaxi.png",
        name: "GetTaxi",
        price: 5.99,
        desc: "To take a taxi!",
        companyName: "KahMonit (C)"
    }
];



app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const { Pool } = require('pg');

function createNewPool() {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'Aa123456',
        port: 5432,
    });
    return pool;
}

const pool = createNewPool();

onStart();



async function getStarters() {
    await clear();
    let rows = await getAll();
    let starters = [...applications];
    for (element in starters) {
        add(starters[element]);
    }
}

async function isTableExists() {
    let ret = false;
    try {
        await pool.query('SELECT * FROM tlv_parkings.parkings');
        ret = true;
    }
    catch (e) {
        ret = false;
    }
    finally {
        return ret;
    }
}

async function onStart() {
    let needTable = await !isTableExists();
    if (needTable) {
        await createTable();
    }
    let needStarters = await getAll();
    if (needStarters.length == 0) {
        await getStarters();
    }
}


async function createTable() {
    console.log("creating new table...");
    try {
        let queryRes = await pool.query('CREATE TABLE appcenter.applications(id int, imageUrl varchar(255), name varchar(255), price float, description varchar(255), companyName  varchar(255),createdAt date);');
        console.log("table created");
    }
    catch (e) {
        console.log(e.message);
    }
}



async function getAll() {
    try {
        const data = await pool.query('SELECT * FROM appcenter.applications');
        return data.rows;
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}

async function getById(id) {
    try {
        const data = await pool.query(`SELECT * FROM appcenter.applications WHERE id=${id}`);
        return data.rows[0];
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}

async function deleteById(id) {
    try {
        const data = await pool.query(`DELETE FROM appcenter.applications WHERE id=${id}`);
        return data.rows[0];
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}

async function clear() {
    try {
        const data = await pool.query(`DELETE FROM appcenter.applications`);
        return data.rows[0];
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}

async function add(app) {
    app['id'] = Math.floor(Math.random() * 1000000);
    var today = new Date();
    try {
        let data = await pool.query('INSERT INTO  appcenter.applications VALUES ($1, $2, $3, $4, $5, $6,$7);', [app['id'], app['imageUrl'], app['name'], app['price'], app['desc'], app['companyName'], today]);
        return data;
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}

async function edit(app) {
    try {
        let data = await pool.query('UPDATE appcenter.applications SET id=$1, imageurl=$2, name=$3, price=$4, description=$5, companyname=$6  WHERE (id = $1);', [app['id'], app['imageUrl'], app['name'], app['price'], app['desc'], app['companyName']]);
        return data;
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}

async function searchByName(name) {
    try {
        const data = await pool.query(`SELECT * FROM appcenter.applications WHERE UPPER(name) LIKE UPPER('%${name}%') LIMIT 1000;`);
        return data.rows;
    }
    catch (e) {
        console.log(e.message);
        return e.message;
    }
}


module.exports = { searchByName, getAll, edit, getById, deleteById, add, clear };