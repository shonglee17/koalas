
const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
router.get('/', (req,res) =>{
    let sqlQuery = `
    SELECT * FROM "Koalas"
        ORDER BY "id";
    `;

    pool.query(sqlQuery)
    .then((dbRes)=>{
        let koalas = dbRes.rows
        res.send(koalas)
    }).catch((dbErr) =>{
        console.log('GET route broke', dbErr)
        res.sendStatus(500)
    })

})

// POST
router.post('/', (req, res) => {
    console.log(req.body);
    let koalaToSend = req.body;
    console.log('adding a new koala', koalaToSend);

    let sqlQuery = `
        INSERT INTO "Koalas" ("name", "age", "gender", "ready_for_transfer", "notes")
            VALUES ($1, $2, $3, $4, $5);
    `;
    let sqlValues = [koalaToSend.name, koalaToSend.age, koalaToSend.gender, koalaToSend.ready_for_transfer, koalaToSend.notes];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log(`error in posting to db`, dbErr);
            res.sendStatus(500);
        });
});

// PUT
router.put('/:id', (req,res)=>{
    let idToUpdate = req.params.id
    let newTransfer = req.body.ready_for_transfer
    console.log(idToUpdate);
    console.log(newTransfer);
    let sqlQuery = `
    UPDATE "Koalas"
    SET "ready_for_transfer" = $1
    WHERE "id" = $2;
    `;

    let sqlValues = [newTransfer, idToUpdate]

    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
        console.log('successful update from put: serverside');
        res.sendStatus(201)
    }).catch(( dbErr)=>{
        console.log('broke in PUT serverside', dbErr);
        res.sendStatus(500)
    })
})

// DELETE

router.delete('/:id', (req,res)=>{
    let idToDelete = req.params.id
   
    let sqlQuery = `
    DELETE FROM "Koalas"
    WHERE "id" = $1;
    `;

    let sqlValues = [idToDelete]

    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
        console.log('successful update from DELETE: serverside');
        res.sendStatus(201)
    }).catch(( dbErr)=>{
        console.log('broke in DELETE serverside', dbErr);
        res.sendStatus(500)
    })
})

module.exports = router;