// Load db config
const db = require('../database/config')
// Load .env variables
require('dotenv').config()
// Util to deep-compare two objects
const lodash = require('lodash')

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

// Returns all rows of candidates in Candidates
const getCandidates = async (req, res) => {
    try {
        // Select all rows from the "Candidates" table
        const query = 'SELECT * FROM Candidates'
        // Execute the query using the "db" object from the configuration file
        const [rows] = await db.query(query)
        // Send back the rows to the client
        res.status(200).json(rows)
    } catch (error) {
        console.error('Error fetching candidates from the database:', error)
        res.status(500).json({ error: 'Error fetching candidates' })
    }
}

// Export the functions as methods of an object
module.exports = {
    getCandidates,
}
