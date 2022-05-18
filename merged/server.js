const express = require('express');
const { Pool } = require('pg');
const bodyParser = require("body-parser");

const router = express.Router();

const pool = new Pool();
const config = require("dotenv").config()
const { acceptsEncodings } = require('express/lib/request');
let app = express();
const port = 8888;
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
let viandes;
let legumes;
let sauces;
let fromages;
let pizza_composee;

app.get('/', async function (req, res) {

    const client = await pool.connect();
    try {

        await client.query('BEGIN')
        const entre_text = 'select * from Entre'
        const pizza_text = 'select * from Pizza'
        const boisson_text = 'select * from boisson'

        const result1 = await client.query(entre_text);
        const result2 = await client.query(pizza_text);
        const result3 = await client.query(boisson_text);

        let all = {
            entre: result1.rows,
            Pizza: result2.rows,
            boisson: result3.rows,


        }
        if (result1.rows.length == 0) {
            res.render("./index.ejs", { root: 'root-client' });
        } else {
            res.render('index.ejs', all);
            //res.render('compose.ejs', all);

        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

});



app.get('/compose', async function (req, res) {

    const client = await pool.connect();
    try {

        await client.query('BEGIN')

        const viandes_text = 'select * from viandes'
        const legumes_text = 'select * from legumes'
        const sauces_text = 'select * from sauces'
        const fromage_text = 'select * from fromages'

        const result4 = await client.query(viandes_text);
        const result5 = await client.query(legumes_text);
        const result6 = await client.query(sauces_text);
        const result7 = await client.query(fromage_text);

        const pc = 'select * from pizza_c';
        const r = await client.query(pc);


        let all = {

            viandes: result4.rows,
            legumes: result5.rows,
            sauces: result6.rows,
            fromages: result7.rows,
            pizza_composee: r


        }
        if (result4.rows.length == 0) {
            res.render("./compose.ejs", { root: 'root-client' });
        } else {
            res.render('compose.ejs', all);
            //res.render('compose.ejs', all);

        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

});




app.get('/livraison', async function (req, res, next) {
    res.render('livraison.ejs', '');
});



app.get('/compose', async function (req, res, next) {
    res.render('compose.ejs', '');
});



app.post('/livraison', async function (req, res) {

    const L_name = req.body.username;
    const L_pwd = req.body.pwdl;

    const S_name = req.body.sign_name;
    const S_mail = req.body.sign_mail;
    const S_pwd = req.body.sign_pwd;
    const S_cpwd = req.body.sign_pwd1;
    const i = 2;


    const liv = await pool.connect();
    try {
        await liv.query('BEGIN');
        var sql = 'SELECT * FROM livreur WHERE nom =$1 AND pwd =$2';
        // var sign = 'insert into livreur (id,nom,mail,pwd) values ($1,$2,$3,$4)  ';
        const con = await liv.query(sql, [L_name, L_pwd]);
        //const si = await liv.query(sign, [i, S_name, S_mail, S_pwd]);



        // var test = "INSERT INTO livreur(id,nom,mail, pwd) VALUES (2,'jiji','jiji@gmail.com', 'azerty4')";



        if (con.rows.length == 0) {
            res.render('livraison.ejs', { root: 'root-liv' });
        } else {
            res.render('commande.ejs', { root: 'root-liv' });

        }
    } catch (e) {
        await liv.query('ROLLBACK')
        throw e
    } finally {
        liv.release()
    }

});

app.listen(port, '127.0.0.1', () => {
    console.log(`App running on port ${port}.`)
})




/* configuration*/

/*app.post('/livraison', async function(req, res) {

    const name = body.sign_name;
    const mail = body.sign_mail;
    const pwd = body.sign_pwd;
    const cpwd = body.sign_pwd1;

    const liv = await pool.connect(); 
    try
    await liv.query('BEGIN')



    // check unique email address
    var sql = 'SELECT * FROM livreur WHERE mail=?';
    await liv.query(sql, [inputData.mail], function(err, data, fields) {
        if (err) { throw err }

        if (data.length > 1) {
            var msg = inputData.mail + "was already exist";
        } else if (inputData.cpwd != inputData.pwd) {
            var msg = "Password & Confirm Password is not Matched";
        } else {

            // save users data into database
            var sql = 'INSERT INTO livreur SET ?';
            await liv.query(sql, inputData, function(err, data) {
                if (err) throw err;
            });
            var msg = "Your are successfully registered";
        }
        res.render('livraison.ejs', { alertMsg: msg });
        console.log(msg);
    })

});
module.exports = router;
*/