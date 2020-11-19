/* DEPENDECIES */
const { Router } = require(`express`); 

// APP 
const router = Router();

// MODELS 
const Admin = require("../models/Admin");

/* ENDPOINTS ADMINS */
//------------------ /* GET */ ---------------------------// 
router.get("/admins" , (req , res) => {
    Admin.find()
    .then(admins => {res.status(200).send(admins)}) 
})

//------------------ /* POST */ ---------------------------// 
router.post("/admins", (req, res) => {
    const ADMIN_REQUIRED = req.body;

    Admin.findOne( {admin: ADMIN_REQUIRED.admin } )    
    .then( admin => { if (!admin) return res.status(400).send( {isAuth : false} ) 
    
        if ( admin.password === ADMIN_REQUIRED.password )  {
            res.status(200).send( {isAuth : true} )
        }
        else 
            res.status(400).send( {isAuth : false} )
    })
    .catch( error => { console.log("err") });
})

module.exports = router; 