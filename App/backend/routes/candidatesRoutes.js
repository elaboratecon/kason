const express = require('express')
const router = express.Router()

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

const {
    getCandidates,
} = require('../controllers/candidatesController')

router.get('/', getCandidates)
// router.get('/:id', getCandidateByID)
// router.post('/', createCandidate)
// router.put('/:id', updateCandidate)
// router.delete('/:id', deleteCandidate)

module.exports = router
