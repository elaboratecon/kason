// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require('../database/config')
// Load .env variables
require('dotenv').config()
// Util to deep-compare two objects
const lodash = require('lodash')

// Returns all rows in CandidatesForPostings
const getCandidatesForPostings = async (req, res) => {
    try {
        // Select all rows from the "CandidatesForPostings" table
        const query1 = 'SELECT candidate_for_posting_id, CandidatesForPostings.posting_id, CandidatesForPostings.candidate_id, Postings.position AS posting_position, CONCAT(Candidates.first_name, " ", Candidates.last_name) AS candidate_full_name FROM CandidatesForPostings INNER JOIN Postings ON Postings.posting_id = CandidatesForPostings.posting_id INNER JOIN Candidates ON Candidates.candidate_id = CandidatesForPostings.candidate_id;'

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

// Creates a new CandidatesForPostings entry
const createCandidatesForPosting = async (req, res) => {
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

// Updates a CandidatesForPostings entry
const updateCandidatesForPostings = async (req, res) => {
    const { params, body: newEntry } = req
    const { id: candidate_for_posting_id } = params
    const { posting_id, candidate_id } = newEntry

    try {
        const [data] = await db.query('SELECT * FROM CandidatesForPostings WHERE candidate_for_posting_id = ?', [
            candidate_for_posting_id,
        ])
        const oldEntry = data[0]

        if (!lodash.isEqual(newEntry, oldEntry)) {
            // console.log("NewEntry: ", newEntry)
            const query = 'UPDATE CandidatesForPostings SET posting_id=?, candidate_id=? WHERE candidate_for_posting_id=?'
            const values = [
                posting_id,
                candidate_id,
                candidate_for_posting_id,
            ]

            // Perform the update
            await db.query(query, values)

            // Inform client of success and return 
            return res
                .json({ message: 'Entry updated successfully.'})
        }
        // entries are the same
        res.json({ message: 'Details are the same as an existing entry. No update.'})
    } catch (error) {
        console.log('Error updating CandidatesForPostings', error)
        res
            .status(500)
            .json({ error: `Error updating the entry with ID ${candidate_for_posting_id}`})
    }
}

const deleteCandidatesForPosting = async (req, res) => {
    const { params, body } = req
    // ? Are we passing a body when we call this?
    const { id: candidate_for_posting_id } = params

    try {
        // Ensure the entry exists
        const [isExisting] = await db.query(
            'SELECT 1 FROM CandidatesForPostings WHERE candidate_for_posting_id = ?',
            [candidate_for_posting_id]
        )

        // If the entry doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send('Entry not found')
        }

        const [response] = await db.query(
            'DELETE FROM CandidatesForPostings WHERE candidate_for_posting_id = ?',
            [candidate_for_posting_id]
        )

        console.log(
            'Deleted',
            response.affectedRows,
            'rows from CandidatesForPostings table'
        )

        // Return the appropriate status code
        res
            .status(204)
            .json({ message: 'Employer deleted successfully' })
            // 204 must not have a body, it will ignore the attached .json(...)
    } catch (error) {
        console.error('Error deleting entry from the database:', error)
        res
            .status(500)
            .json({ error: error.message })
    }
}

// Export the functions as methods of an object
module.exports = {
    getCandidatesForPostings,
    createCandidatesForPosting,
    updateCandidatesForPostings,
    deleteCandidatesForPosting,
}
