
const express = require('express'); //on prend le module express qu'on met dans la variable express
const mysql = require('mysql');//le module mysql
const fs = require('fs') 


// const session = require('express-session');
const app = express();//Notre application


const db = mysql.createConnection({//j'établie la constante qui vas me permettre a me connecter sur mysql et surtout sur ma base de données cameroun1
    host: "localhost",   
    user: "root",   
    password: "root",
    database:"cameroun1"
});

//je me connecte a ma bd
db.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });

//j'utilise les dossiers css js et img contenue dans public

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/infos', function(req, res) {
    res.render('pages/infos');
});

//login page

app.get('/login', function(req, res) {

    res.render('pages/login');
});

app.post("/inscription",(req, res)=>{
    let Nomc = req.body.NomC
    let mailC = req.body.mailC
    let pwdC = req.body.pwdC

    db.query('insert into client values(?, ?, ?, ?)',[null, Nomc, mailC, pwdC], (err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            res.redirect('/login');
        }
    } )
});


app.post("/naissance",(req, res)=>{
    let nomen = req.body.nomen
    let datenais = req.body.datenais
    let sexe = req.body.sexe
    let placenaiss = req.body.placenaiss
    let nomp = req.body.nomp
    let datep = req.body.datep
    let lieunaisp = req.body.lieunaisp
    let profp = req.body.profp
    let idcnip = req.body.idcnip
    let domiclep = req.body.domiclep
    let nomm = req.body.nomm
    let datem = req.body.datem
    let lieunaism = req.body.lieunaism
    let profm = req.body.profm
    let idcnim = req.body.idcnim
    let domiclem = req.body.domiclem
    let nomC = req.body.nomC
    let pwdC = req.body.pwdC
    let mailc = req.body.mailc
    let datea = req.body.datea
    let timea = req.body.timea
    let th = req.body.th
    let cnip = req.body.cnip
    let cnim = req.body.cnim
    let declanais = req.body.declanais
    db.query('insert into birth values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[null, nomen, datenais, sexe, placenaiss, nomp, datep, lieunaisp, profp, idcnip, domiclep, nomm, datem, lieunaism, profm, idcnim, domiclem, nomC, pwdC, mailc, datea, timea, th, cnip, cnim, declanais], (err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            console.log({result})
        }
    } )

})

// la méthode d'authentification des utilisateurs

app.post("/authentification",(req, res)=>{
    let NomAu = req.body.NomAu
    let pwdAu = req.body.pwdAu

    db.query('insert into auth values(?, ?, ?)',[null, NomAu, pwdAu], (err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            db.query('SELECT DISTINCT NomAu, pwdAu FROM `auth` WHERE NomAu IN (SELECT NomC FROM `client`) AND pwdAu IN( SELECT pwdC From `client`);',[],(err, resultat)=>{
                if(err){
                    console.log("erreur");
                }
                else{
                    // const rien = []
                    console.log({resultat});
                    console.log(resultat.length);
                    
                    if(resultat.length != 0){
                        console.log("c'est un client");
                        res.render('pages/client',{result:result});
                    }
                    else{
                        console.log("l'erreur de l'utilisateur ou c'est un administrateur");
                        db.query('SELECT DISTINCT NomAu, pwdAu FROM `auth` WHERE NomAu IN (SELECT NomA FROM `admin`) AND pwdAu IN( SELECT pwdA From `admin`);',[],(err, resultat)=>{
                            if(resultat.length != 0){
                                console.log("c'est un admin");
                                res.render('pages/admin');
                            }
                            else{
                                console.log("pas bon");
                                res.redirect("login");
                            }
                        })
                    }
                    db.query("truncate table auth;",[],function(err,result) { if (err) throw err; console.log({result}); });
                }
            });
        }
    });
});

app.post("/mort",(req,res)=>{
    let nomde = req.body.nomde;
    let prenomde = req.body.prenomde
    let datedeath = req.body.datedeath
    let deathplace = req.body.deathplace
    let datenaiss = req.body.datenaiss
    let placenaiss = req.body.placenaiss
    let sexed = req.body.sexed
    let mastatus = req.body.mastatus
    let profd = req.body.profd
    let residence = req.body.residence
    let nomp = req.body.nomp
    let nomm = req.body.nomm
    let nomc = req.body.nomc
    let pwdC = req.body.pwdC
    let mailc = req.body.mailc
    let datea = req.body.datea
    let timea = req.body.timea
    let th = req.body.th
    let decladeath = req.body.decladeath
    let birthdef = req.body.birthdef
    db.query('insert into death values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[null, nomde, prenomde, datedeath, deathplace, datenaiss, placenaiss, sexed, mastatus, profd, residence, nomp, nomm, nomc, pwdC, mailc, datea, timea, th, decladeath, birthdef],(err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            console.log({result})
        }
    })
    
})

//client page

app.get('/client', function(req, res) {
    res.render('pages/client');
    
});



app.get('/birth', function(req, res) {
    res.render('pages/actnais');
    
});
app.get('/invoice', function(req, res) {
    res.render('pages/payement');
    
});

app.get('/death', function(req, res) {
    res.render('pages/death');
    
});

//client page

app.get('/Admin', function(req, res) {

    db.query('SELECT * FROM admin',[], (err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            console.log({result});
            res.render('pages/admin', {result});
            db.query('select * from client',[],(err,resultat)=>{
                if(err){
                    console.log("Ca marche pas");
                }
                else{
                    // res.render('pages/admin', {resultat});
                    console.log({resultat});
                }
            })
        }
    });
});
app.get('/Admin/user', function(req, res) {

    db.query('select * from client',[],(err,result)=>{
         if(err){
            console.log("Ca marche pas");
        }
        else{
            console.log({result})
            res.render('pages/admin', {result});
            
        }
    })
});

app.get('/requests', function(req, res) {

    db.query('SELECT * FROM birth',[], (err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            res.render('pages/requests', {result});
        }
    });
});

app.get('/user', function(req, res){
    db.query('SELECT * FROM client',[], (err, result)=>{
        if(err){
            console.log("marche pas");
        }
        else{
            res.render('pages/user', {result});
        }
    });
})

app.listen(8080);
console.log('8080 is the magic port');