const express = require('express')
const router = express.Router()

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

const {
    getCandidatesForPostings,
} = require('../controllers/candidatesForPostingsController')

router.get('/', getCandidatesForPostings)
// router.get('/:id', getCandidatesForPostingByID)
// router.post('/', createCandidatesForPosting)
// router.put('/:id', updateCandidatesForPosting)
// router.delete('/:id', deleteCandidatesForPosting)

module.exports = router
