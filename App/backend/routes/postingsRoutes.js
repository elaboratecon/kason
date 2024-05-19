const express = require('express')
const router = express.Router()

const {
    getPostings,
} = require('../controllers/postingsController')

router.get('/', getPostings)
// router.get('/:id', getPostingByID)
// router.post('/', createPosting)
// router.put('/:id', updatePosting)
// router.delete('/:id', deletePosting)

module.exports = router
