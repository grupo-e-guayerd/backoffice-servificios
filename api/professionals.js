/* DEPENDECIES */
const { Router } = require(`express`); 

// APP 
const router = Router();

// MODELS 
const Professional = require("../models/Professional.js");

/* ENDPOINTS */
//------------------ /* GET */ ---------------------------// 
// GET PROFESSIONALS
router.get("/professionals", (req, res) => {
    Professional.find()
    .then((professionals) => {
        let auxArrayProfessionals=  professionals.filter( professional => professional.status === true)
        auxArrayProfessionals && (
            res.status(200).send(auxArrayProfessionals)
        ) 
    })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) });
})

// GET Professionals deleted
router.get("/professionals/deleted", (req, res) => {
    Professional.find()
    .then((professionals) => {
        let auxArrayDeleted =  professionals.filter( professional =>professional.status === false)
        auxArrayDeleted.length === 0 ? (
            res.status(200).send({ error: "No professionals deleted." })
            ) : (
            res.status(200).send(auxArrayDeleted)
        )
    })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) })
})

/* GET by ID */
router.get("/professionals/:id", (req, res) => {
    const ID_REQUIRED = req.params.id;

    Professional.findById( { _id: ID_REQUIRED })
    .then((professional)=>{
        professional ? res.status(200).send(professional) : res.status(400).send({error: `_id: ${ID_REQUIRED} Not found.`})
    })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." }) })
})

/* GET by name */
router.get("/professionals/names/:name", (req, res) => {
    const NAME_REQUIRED = {$regex:req.params.name};

    Professional.find({name: NAME_REQUIRED})
    .then((nameRequiredProfessionals)=>{
        nameRequiredProfessionals.length === 0 && (res.status(400).send({error: `${NAME_REQUIRED} not found.`}))
        nameRequiredProfessionals.length > 0 && ( res.status(200).send({nameRequiredProfessionals}))
    })
    .catch( error => { res.status(500).send({ error: "An error has ocurred." })});
});

/* GET by zone */
router.get("/professionals/zones/:zone", (req, res) => {
    const ZONE_REQUIRED = {$regex:req.params.zone};

    Professional.find({zone: ZONE_REQUIRED})
    .then((zoneRequiredProfessionals)=>{
        zoneRequiredProfessionals.length === 0 && (res.status(400).send({error: `${ZONE_REQUIRED} not found.`}))
        zoneRequiredProfessionals.length > 0 && ( res.status(200).send({zoneRequiredProfessionals}))
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." })});
});

/* GET by job */
router.get("/professionals/jobs/:job", (req, res) => {
    const JOB_REQUIRED = {$regex:req.params.job};

    Professional.find({job: JOB_REQUIRED})
    .then((jobRequiredProfessionals)=>{
        jobRequiredProfessionals.length === 0 && (res.status(400).send({error: `${JOB_REQUIRED} not found.`}))
        jobRequiredProfessionals.length > 0 && ( res.status(200).send({jobRequiredProfessionals}))
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." })});
});

//------------------ /* POST */ ---------------------------// 
router.post("/professionals", (req, res) => {
    const obj = { ...req.body }

    const doc = new Professional(obj);

    doc.save()
    .then(professional => { res.status(200).send(professional) })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." }) })

});

//------------------ /* PUT */ ---------------------------// 
router.put("/professionals/:id", (req, res)=>{
    const ID_REPLACE = req.params.id;
    const editedProfessional = req.body;

    if ( validatePUTData(editedProfessional) ) {
        Professional.findByIdAndUpdate( {_id: ID_REPLACE}, editedProfessional, (error, result)=>{/* TODO quitar callBack y usar then */
            error ? res.status(400).send({error: "_id not found"}) : res.status(200).send(editedProfessional)
        });
    }
    else {
        res.status(200).send({error: "Insufficient data."})
    }
})

//------------------ /* DELETE */ ---------------------------// 
router.delete("/professionals/:id", (req, res)=>{
    const ID_DELETE = req.params.id;

    Professional.findByIdAndUpdate({_id: ID_DELETE}, {status: false}, (error, result)=>{ /* TODO quitar callBack y usar then */
        error ? res.status(400).send({error: "_id not found"}) : (
            res.status(200).send({message: `_id: ${ID_DELETE} has been deleted.`})
        )
    });
});

/* Extra Function ------------------------------------------------------------ */
let validatePUTData = (professionalToPUT)=>{
    const { name, hourPrice, job, currency, rating, description, zone, imgUrl} = professionalToPUT;
    if ( name && hourPrice && job && currency && rating && description && zone && imgUrl ) { return true }
}

module.exports = router; 