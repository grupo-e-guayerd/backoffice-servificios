/* DEPENDECIES */
const { Router, json } = require(`express`); 

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

/* GET by name */
router.get("/pendings/names/:name", (req, res) => {
    const NAME_REQUIRED = {$regex:req.params.name};

    Pending.find({name: NAME_REQUIRED})
    .then((nameRequiredPendings)=>{
        nameRequiredPendings.length === 0 && (res.status(400).send({error: `${NAME_REQUIRED} not found.`}))
        nameRequiredPendings.length > 0 && ( res.status(200).send(nameRequiredPendings))
    })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." })});
});

/* GET by zone */
router.get("/pendings/zones/:zone", (req, res) => {
    const ZONE_REQUIRED = {$regex:req.params.zone};

    Pending.find({zone: ZONE_REQUIRED})
    .then((zoneRequiredPendings)=>{
        zoneRequiredPendings.length === 0 && (res.status(400).send({error: `${ZONE_REQUIRED} not found.`}))
        zoneRequiredPendings.length > 0 && ( res.status(200).send(zoneRequiredPendings))
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." })});
});

/* GET by job */
router.get("/pendings/jobs/:job", (req, res) => {
    const JOB_REQUIRED = {$regex:req.params.job};

    Pending.find({job: JOB_REQUIRED})
    .then((jobRequiredPendings)=>{
        jobRequiredPendings.length === 0 && (res.status(400).send({error: `${JOB_REQUIRED} not found.`}))
        jobRequiredPendings.length > 0 && ( res.status(200).send(jobRequiredPendings))
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." })});
});


router.delete("/pendings/:id", (req, res)=>{
    const ID_DELETE = req.params.id;

    Pending.findByIdAndDelete(ID_DELETE)
    .then( response => {
        if (!response) { return res.status(400).send({error: `ID ${ID_DELETE} not found.`}) }
        res.status(200).send(response)
    }).catch( error => { res.status(500).send({ error: "An error has ocurred." }) });
});





/* ------------------------------------------------------------------------------------------------------ */




module.exports = router;