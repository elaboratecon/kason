const express = require('express')
const router = express.Router()

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

const {
    getEmploymentHistories,
    createEmploymentHistory,
    updateEmploymentHistory,
    deleteEmploymentHistory,
} = require('../controllers/employmentHistoriesController')

router.get('/', getEmploymentHistories)
// router.get('/:id', getEmploymentHistoryByID)
router.post('/', createEmploymentHistory)
router.put('/:id', updateEmploymentHistory)
router.delete('/:id', deleteEmploymentHistory)

module.exports = router
