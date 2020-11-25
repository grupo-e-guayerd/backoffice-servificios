/* DEPENDECIES */
const { Router } = require(`express`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// APP 
const router = Router();

// MODELS 
const Admin = require("../models/Admin");

/* ADMINS */

/* LOGIN ADMINS */
router.post("/login", (req, res) => {

    const {admin, password} = req.body;
    Admin.findOne({admin: admin})
    .then(admin => {  if(!admin) return res.status(400).send({isAuth : false});
        bcrypt.compare(password, admin.password)
        .then(match=> {   if(!match) return res.status(400).send({isAuth : false});
            jwt.sign({admin}, "secretgrupoe", (err, token) => {
                res.send({token});
            });
        })
        .catch(err=> res.status(500).send({err:"Error 500"}));
    })
    .catch(err=> res.status(500).send({err:"Error 500"}));

})

/* REGISTER ADMINS */
router.post("/register", (req,res) => {

    const {admin, password} = req.body;
    const doc = new Admin ({ admin, password });

    doc.save()
    .then(user=> res.status(201).send({message:"User created"}))
    .catch(err=> res.status(500).send({err:"Error 500"}));

})

/* ALL ADMINS */
router.get("/admins" , (req , res) => {
    Admin.find()
    .then(admins =>{
        res.status(200).send(admins)
    }) 
})

/* FUNCTION VERIFY (AUTHORIZATION) */
function verifyToken(req, res, next) {
    const bearer  = req.headers["authorization"];

    if(typeof bearer !== "undefined") {
        const bearerToken = bearer.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403).send({err: "No autorizado"});
    }
}

module.exports = router; 