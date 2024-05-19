const express = require('express')
const router = express.Router()

const {
    getCandidatesForPostings,
} = require('../controllers/candidatesForPostingsController')

router.get('/', getCandidatesForPostings)
// router.get('/:id', getCandidatesForPostingByID)
// router.post('/', createCandidatesForPosting)
// router.put('/:id', updateCandidatesForPosting)
// router.delete('/:id', deleteCandidatesForPosting)

module.exports = router
