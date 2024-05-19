// Load db config
const db = require('../database/config')
// Load .env variables
require('dotenv').config()
// Util to deep-compare two objects
const lodash = require('lodash')

// Returns all rows of postings in Postings
const getPostings = async (req, res) => {
    try {
        // Select all rows from the "Postings" table
        const query = 'SELECT posting_id, position, description, Employers.name AS employer_name, Employers.location AS employer_location FROM Postings INNER JOIN Employers ON Employers.employer_id = Postings.employer_id;'

        // Execute the query using the "db" object from the configuration file
        const [rows] = await db.query(query)
        // Send back the rows to the client
        res.status(200).json(rows)
    } catch (error) {
        console.error('Error fetching postings from the database:', error)
        res.status(500).json({ error: 'Error fetching postings' })
    }
}

// Export the functions as methods of an object
module.exports = {
    getPostings,
}
