/* DEPENDECIES */
const { Router } = require(`express`); 

// APP 
const router = Router();

// MODELS 
const Category = require("../models/Category");

/* ENDPOINTS */
router.get("/categories" , (req , res) => {
    Category.find()
    .then(categories => {res.status(200).send(categories)})
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) });
})

module.exports = router; 