/* DEPENDECIES */
const { Router } = require(`express`); 

// APP 
const router = Router();

// MODELS 
const Zone = require("../models/Zone");

/* ENDPOINTS */
router.get("/zones" , (req , res) => {
    Zone.find()
    .then(zones => {res.status(200).send(zones)})
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) });
})

module.exports = router; 