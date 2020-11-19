/* DEPENDECIES */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const URL_DB = require("./config");

// MODELS 
const Professional = require("./models/Professional.js");

// APP 
const app = express();

// MIDDLEWARES 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SETTINGS 
app.set("port", process.env.PORT || 3001);



/* ENDPOINTS */
// GET PROFESSIONALS
app.get("/professionals", (req, res) => {
    Professional.find()
    .then((professionals) => {
        let auxArrayProfessionals=  professionals.filter((professional)=>professional.status === true)
        auxArrayProfessionals.length === 0 ? (
            res.status(200).send({ error: "Collection empty." })
            ) : (
            res.status(200).send(auxArrayProfessionals)
        )
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." }) });
})

// GET Professionals deleted
app.get("/professionals/deleted", (req, res) => {
    Professional.find()
    .then((professionals) => {
        let auxArrayDeleted =  professionals.filter((professional)=>professional.status === false)
        auxArrayDeleted.length === 0 ? (
            res.status(200).send({ error: "No professionals deleted." })
            ) : (
            res.status(200).send(auxArrayDeleted)
        )
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." }) })
})

// POST 
app.post("/professionals", (req, res) => {
    const obj = { ...req.body }

    const doc = new Professional(obj);

    doc.save()
    .then(professional => { res.status(200).send(professional) })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." }) })

});

/* PUT */
app.put("/professionals/:id", (req, res)=>{
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


/* DELETE */
app.delete("/professionals/:id", (req, res)=>{
    const ID_DELETE = req.params.id;

    Professional.findByIdAndUpdate({_id: ID_DELETE}, {status: false}, (error, result)=>{ /* TODO quitar callBack y usar then */
        error ? res.status(400).send({error: "_id not found"}) : (
            res.status(200).send({message: `_id: ${ID_DELETE} has been deleted.`})
        )
    });
});


/* GET by ID */
app.get("/professionals/:id", (req, res) => {
    const ID_REQUIRED = req.params.id;

    Professional.findById( { _id: ID_REQUIRED })
    .then((professional)=>{
        professional ? res.status(200).send(professional) : res.status(400).send({error: `_id: ${ID_REQUIRED} Not found.`})
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." }) })
})

/* GET by name */
/* GET by zone */


/* GET by job */
app.get("/professionals/jobs/:job", (req, res) => {
    const JOB_REQUIRED = {$regex:req.params.job};

    Professional.find({job: JOB_REQUIRED})
    .then((jobRequiredProfessionals)=>{
        jobRequiredProfessionals.length === 0 && (res.status(400).send({error: `${JOB_REQUIRED} not found.`}))
        jobRequiredProfessionals.length > 0 && ( res.status(200).send({jobRequiredProfessionals}))
    })
    .catch((error) => { res.status(500).send({ error: "An error has ocurred." })});
});


// DATABASE AND SERVER CONECTION
mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) { console.log("Error on try connect database.\n") }
    else {
        console.log("Database conected.\n")

        app.listen(app.get("port"), (error) => {
            console.log(`Server running in port ${app.get("port")}\n`);
        })
    }
})
/* Extra Function ------------------------------------------------------------ */
let validatePUTData = (professionalToPUT)=>{
    const { name, hourPrice, job, currency, rating, description, zone, imgUrl} = professionalToPUT;
    if ( name && hourPrice && job && currency && rating && description && zone && imgUrl ) { return true }
}