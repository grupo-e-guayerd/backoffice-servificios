/* DEPENDECIES */
const { Router } = require(`express`); 

// APP 
const router = Router();

// MODELS 
const Pending = require("../models/ProfessionalPending.js");


/* ENDPOINTS professinalPendings ------------------------------------------------------------------------ */

router.get("/pendings", (req, res) => {
    Pending.find()
    .then((profPendings) => { res.status(200).send(profPendings) })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) });
})

router.post("/pendings", (req, res)=>{
    const NEW_PROF_PENDING = "hola";
});





/* ------------------------------------------------------------------------------------------------------ */




module.exports = router;