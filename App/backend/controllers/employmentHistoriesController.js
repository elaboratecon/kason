// Load db config
const db = require('../database/config')
// Load .env variables
require('dotenv').config()
// Util to deep-compare two objects
const lodash = require('lodash')

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

// Returns all rows in EmploymentHistories
const getEmploymentHistories = async (req, res) => {
    try {
        // Select all rows from the "EmploymentHistories" table
        const query = 'SELECT employment_history_id, position, CONCAT(Candidates.first_name, " ", Candidates.last_name) AS candidate_full_name, Employers.name AS employer_name_from_database, employer_name, start_date, end_date, currently_employed FROM EmploymentHistories INNER JOIN Candidates ON EmploymentHistories.candidate_id = Candidates.candidate_id LEFT JOIN Employers ON EmploymentHistories.employer_id = Employers.employer_id;'

        // Execute the query using the "db" object from the configuration file
        const [rows] = await db.query(query)
        // Send back the rows to the client
        res.status(200).json(rows)
    } catch (error) {
        console.error('Error fetching employment histories from the database:', error)
        res.status(500).json({ error: 'Error fetching employment histories' })
    }
}

// Export the functions as methods of an object
module.exports = {
    getEmploymentHistories,
}
