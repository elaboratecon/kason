const express = require('express')
const router = express.Router()

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

const {
    getPostings,
} = require('../controllers/postingsController')

router.get('/', getPostings)
// router.get('/:id', getPostingByID)
// router.post('/', createPosting)
// router.put('/:id', updatePosting)
// router.delete('/:id', deletePosting)

module.exports = router
