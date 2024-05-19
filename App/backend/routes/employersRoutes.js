const express = require('express')
const router = express.Router()

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
