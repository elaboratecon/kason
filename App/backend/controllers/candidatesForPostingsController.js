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
        const query1 = 'SELECT candidate_for_posting_id, Postings.position AS posting_position, CONCAT(Candidates.first_name, " ", Candidates.last_name) AS candidate_full_name FROM CandidatesForPostings INNER JOIN Postings ON Postings.posting_id = CandidatesForPostings.posting_id INNER JOIN Candidates ON Candidates.candidate_id = CandidatesForPostings.candidate_id;'

        // Select posting_id and posting_position from "POSTINGS" table
        const query2 = 'SELECT posting_id, position, Employers.name AS employer_name, Employers.location AS employer_location FROM Postings INNER JOIN Employers ON Employers.employer_id = Postings.employer_id;'

        // Select full names from the "Candidates" table
        const query3 = 'SELECT candidate_id, CONCAT(first_name, " ", last_name) as candidate_full_name FROM Candidates'

        // Execute the query using the "db" object from the configuration file
        const [resp1] = await db.query(query1)
        const [resp2] = await db.query(query2)
        const [resp3] = await db.query(query3)

        // Send structured data back to client
        res
            .status(200)
            .json({
                candidates_for_postings: resp1,
                postings_positions: resp2,
                candidates_full_names: resp3,
            })
    } catch (error) {
        console.error('Error fetching CandidatesForPostings from the database:', error)
        res.status(500).json({ error: 'Error fetching CandidatesForPostings' })
    }
}

// Creates a new CandidatesForPosting entry
const createCandidatesForPosting = async(req, res) => {
    try {
        const { body } = req
        const { posting_id, candidate_id } = body

        query = 'INSERT INTO CandidatesForPostings (posting_id, candidate_id) VALUES (?, ?)'
        const response = await db.query(query, [
            posting_id,
            candidate_id,
        ])
        res
            .status(200)
            .json(response)
    } catch (error) {
        console.error('Error creating CandidatesForPosting entry in database:', error)
        res
            .status(500)
            .json({ error: 'Error posting CandidatesForPostings'})
    }
}

// Export the functions as methods of an object
module.exports = {
    getCandidatesForPostings,
    createCandidatesForPosting,
}
