const express = require('express')
const router = express.Router()

const {
    getCandidates,
} = require('../controllers/candidatesController')

router.get('/', getCandidates)
// router.get('/:id', getCandidateByID)
// router.post('/', createCandidate)
// router.put('/:id', updateCandidate)
// router.delete('/:id', deleteCandidate)

module.exports = router
