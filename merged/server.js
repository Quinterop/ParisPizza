const express = require('express');
const { Pool } = require('pg');
const bodyParser = require("body-parser");
const router = express.Router();

const pool = new Pool();
const config = require("dotenv").config()
const { acceptsEncodings } = require('express/lib/request');
let app = express();
const port = 4545;
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
let commande;
let sc;

//Avoir le menu 
app.get('/', async function(req, res) {

    const client = await pool.connect();
    try {

        await client.query('BEGIN')
        const entre_text = 'select * from Entre'
        const pizza_text = 'select * from Pizza'
        const boisson_text = 'select * from boisson'
        const sauces_text = 'select * from sauces'


        const result1 = await client.query(entre_text);
        const result2 = await client.query(pizza_text);
        const result3 = await client.query(boisson_text);
        const result10 = await client.query(sauces_text);


        let all = {
            entre: result1.rows,
            Pizza: result2.rows,
            boisson: result3.rows,
            sc: result10.rows


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


// Les ingredients pour la pizza composée
app.get('/compose', async function(req, res) {

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




        let all = {

            viandes: result4.rows,
            legumes: result5.rows,
            sauces: result6.rows,
            fromages: result7.rows,


        }
        if (result4.rows.length == 0) {
            res.render("./compose.ejs", { root: 'root-client' });
        } else {
            res.render('compose.ejs', all);

        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

});




//la page pour se connecter
app.get('/livraison', async function(req, res, next) {
    res.render('livraison.ejs', '');
});



app.get('/compose', async function(req, res, next) {
    res.render('compose.ejs', '');

});





var name;
var addr;
var is = "NON";
var cmd_info = "";
var info = [];
var name_change = "";
var date = "";





//Inserer les infos du commande dans la bdd
app.post('/livraison', async function(req, res) {




    info.push(req.body.name_of_client);
    info.push(req.body.prenom)
    info.push(is);
    info.push(req.body.addr);
    info.push(req.body.cmd_info);
    info.push(req.body.heure);
    info.push(req.body.email);
    info.push(req.body.code);
    info.push(req.body.tel);





    const liv = await pool.connect();
    try {
        await liv.query('BEGIN');
        var sql2 = 'INSERT INTO  commande(name_cmd,prenom_cmd,is_delivred,adresse,cmd_info,date_cmd,email,code,tel) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
        const con1 = await liv.query(sql2, [...info]);

        await liv.query('COMMIT');

        res.redirect('/');
    } catch (e) {

        await liv.query('ROLLBACK')
        throw e
    } finally {
        liv.release()
    }
    console.log("finished")
});

//afficher les infos de la commande 

app.post('/login', async function(req, res) {
    const liv = await pool.connect();
    const L_name = req.body.username;
    const L_pwd = req.body.pwdl;
    var sql1 = 'SELECT * FROM livreur WHERE nom =$1 AND pwd =$2';
    const con = await liv.query(sql1, [L_name, L_pwd]);
    const commandes_text = "select * from commande where is_delivred='NON' order by date_cmd ";
    const commande = await liv.query(commandes_text);

    let all = {
        commande: commande.rows
    }
    res.render('commande.ejs', all)
    liv.release()
})


/*app.get('/login', async function(req, res) {
    const liv = await pool.connect();

    const commandes_text = "select * from commande where is_delivred='NON' order by date_cmd ";
    const commande = await liv.query(commandes_text);

    let all = {
        commande: commande.rows[0]
    }
    let name = commande.rows[0].name;
    res.render('commande.ejs', all);
    let next = "delete from commande where name_cmd='$1'";

    await client.query(next, [name]);
    await liv.query('COMMIT');

    liv.release()
})*/





app.listen(port, '127.0.0.1', () => {
    console.log(`App running on port ${port}.`)
})