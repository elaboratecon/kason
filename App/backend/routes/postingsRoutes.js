// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express')
const router = express.Router()

const {
    getPostings,
    getPostingByID,
    createPosting,
    updatePosting,
    deletePosting,
} = require('../controllers/postingsController')

router.get('/', getPostings)
router.get('/:id', getPostingByID)
router.post('/', createPosting)
router.put('/:id', updatePosting)
router.delete('/:id', deletePosting)

module.exports = router
