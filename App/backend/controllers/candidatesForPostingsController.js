// Load db config
const db = require('../database/config')
// Load .env variables
require('dotenv').config()
// Util to deep-compare two objects
const lodash = require('lodash')

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

// Returns all rows in CandidatesForPostings
const getCandidatesForPostings = async (req, res) => {
    try {
        // Select all rows from the "CandidatesForPostings" table
        const query = 'SELECT candidate_for_posting_id, Postings.position AS posting_position, CONCAT(Candidates.first_name, " ", Candidates.last_name) AS candidate_full_name FROM CandidatesForPostings INNER JOIN Postings ON Postings.posting_id = CandidatesForPostings.posting_id INNER JOIN Candidates ON Candidates.candidate_id = CandidatesForPostings.candidate_id;'

        // Execute the query using the "db" object from the configuration file
        const [rows] = await db.query(query)
        // Send back the rows to the client
        res.status(200).json(rows)
    } catch (error) {
        console.error('Error fetching CandidatesForPostings from the database:', error)
        res.status(500).json({ error: 'Error fetching CandidatesForPostings' })
    }
}

// Export the functions as methods of an object
module.exports = {
    getCandidatesForPostings,
}
