/* DEPENDECIES */
const { Router } = require(`express`); 

// APP 
const router = Router();

// MODELS 
const Pending = require("../models/Pending.js");


/* ENDPOINTS professinalPendings ------------------------------------------------------------------------ */

router.get("/pendings", (req, res) => {
    Pending.find()
    .then((profPendings) => { res.status(200).send(profPendings) })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) });
})

router.post("/pendings", (req, res)=>{
    const NEW_PROF_PENDING = {... req.body};

    const doc = new Pending(NEW_PROF_PENDING);

    doc.save()
    .then( profPending => res.status(200).send(profPending))
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." }) });
});





/* ------------------------------------------------------------------------------------------------------ */




module.exports = router;