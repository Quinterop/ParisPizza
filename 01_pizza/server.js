const express = require('express');
const { Pool } = require('pg');
const bodyParser = require("body-parser");

const pool = new Pool();
const config = require("dotenv").config()
const { acceptsEncodings } = require('express/lib/request');
let app = express();
const port = 4500;
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
let entre;
let Pizza;
let boisson;


app.get('/', async function(req, res) {

    const client = await pool.connect();
    try {

        await client.query('BEGIN')
        const entre_text = 'select * from Entre'
        const pizza_text = 'select * from Pizza'
        const boisson_text = 'select * from boisson'


        const result1 = await client.query(entre_text);
        const result2 = await client.query(pizza_text);
        const result3 = await client.query(boisson_text);


        let tmp = { entre: result1.rows, Pizza: result2.rows, boisson: result3.rows }
        if (result1.rows.length == 0) {
            res.render("./menu.ejs", { root: 'root-client' });
        } else {
            res.render('menu.ejs', tmp);
        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

});







app.listen(port, '127.0.1.1', () => {
    console.log(`App running on port ${port}.`)
})