const express = require('express')
const router = express.Router()

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

const {
    getEmployers,
    getEmployerByID,
    createEmployer,
    updateEmployer,
    deleteEmployer,
} = require("../controllers/employersController");  

router.get('/', getEmployers)
router.get('/:id', getEmployerByID)
router.post('/', createEmployer)
router.put('/:id', updateEmployer)
router.delete('/:id', deleteEmployer)

module.exports = router
