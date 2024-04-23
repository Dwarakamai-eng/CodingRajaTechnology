const express = require('express');
const router = express.Router();

const User = require('../models/user');

// GET => localhost:3000/account/
router.get('/', (req, res) => {
    User.find((err, data) => {
        if (err) {
            return res.json("error !!");
        }
        else {
            res.json(data);
        }
    })
});

// get user details
// GET => localhost:3000/account/dhiraj
router.get('/:user', (req, res) => {
    User.find({
        name : req.params.user,
    },
    (err, data) => {
        if (err) {
            return res.json("error !!");
        }
        else { 
            res.json(data);
        }
    });
});

// create new user
// POST => localhost:3000/account/register
router.post('/register', (req, res) => {
    User.create({
        name : req.body.name,
        password : req.body.password,
    },
    (err, data) => {
        if (err) { 
            return res.json('error !!');
        }
        else { 
            res.json(data);
        }
    });
});

// delete user
// DELETE => localhost:3000/account/update/dhiraj
router.delete('/delete/:user', (req, res) => {
    User.findOneAndRemove({
        name: req.params.user,
    },
    (err, data) => {
        if (err) { 
            return res.json("error !!");
        }
        else { 
            res.json(data);
        }
    });
});

// update password
// PUT => localhost:3000/account/delete/dhiraj
// router.put('/update/:password', (req, res) => {
//     User.findOneAndUpdate({
//         name: req.params.password,
//     },
//     (err, data) => {
//         if (err) {
//             return res.json("error !!");
//         }
//         else {
//             res.json(data);
//         }
//     });
// });

module.exports = router;
