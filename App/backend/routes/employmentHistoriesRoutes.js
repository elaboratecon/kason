const express = require('express')
const router = express.Router()

const {
    getEmploymentHistories,
} = require('../controllers/employmentHistoriesController')

router.get('/', getEmploymentHistories)
// router.get('/:id', getEmploymentHistoryByID)
// router.post('/', createEmploymentHistory)
// router.put('/:id', updateEmploymentHistory)
// router.delete('/:id', deleteEmploymentHistory)

module.exports = router
