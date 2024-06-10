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

// Returns all rows in EmploymentHistories
const getEmploymentHistories = async (req, res) => {
    try {
        // Select all rows from the "EmploymentHistories" table
        const query1 = 'SELECT EmploymentHistories.employer_id, EmploymentHistories.candidate_id, employment_history_id, position, CONCAT(Candidates.first_name, " ", Candidates.last_name) AS candidate_full_name, Employers.name AS employer_name_from_database, employer_name, start_date, end_date, currently_employed FROM EmploymentHistories INNER JOIN Candidates ON EmploymentHistories.candidate_id = Candidates.candidate_id LEFT JOIN Employers ON EmploymentHistories.employer_id = Employers.employer_id;'

        // Select posting_id and posting_position from "POSTINGS" table
        const query2 = 'SELECT employer_id, name, location FROM Employers'

        // Select full names from the "Candidates" table
        const query3 = 'SELECT candidate_id, CONCAT(first_name, " ", last_name) as candidate_full_name FROM Candidates'

        // Execute the query using the "db" object from the configuration file
        const [resp1] = await db.query(query1)
        const [resp2] = await db.query(query2)
        const [resp3] = await db.query(query3)
 
        // Send back the response to the client
        res.status(200).json({
            employment_histories: resp1,
            employers_employers: resp2,
            candidates_full_names: resp3,
        })
    } catch (error) {
        console.error('Error fetching employment histories from the database:', error)
        res.status(500).json({ error: 'Error fetching employment histories' })
    }
}

// Creates a new EmploymentHistories entity
const createEmploymentHistory = async (req, res) => {
    try {
        const { body } = req
        const { position,
            start_date,
            end_date,
            currently_employed,
            employer_name,
            employer_id,
            candidate_id, } = body

        query = 'INSERT INTO EmploymentHistories (position, start_date, end_date, currently_employed, employer_name, employer_id, candidate_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
        const response = await db.query(query, [
            position,
            start_date,
            end_date,
            currently_employed,
            employer_name,
            employer_id,
            candidate_id,
        ])
        res
            .status(200)
            .json(response)
    } catch (error) {
        console.error('Error creating EmploymentHistories entry in database:', error)
        res
            .status(500)
            .json({ error: 'Error posting EmploymentHistories'})
    }
}

// Updates an EmploymentHistories entity
const updateEmploymentHistory = async (req, res) => {
    const { params, body: newEntry } = req
    const { id: employment_history_id } = params
    const { position,
        start_date,
        end_date,
        currently_employed,
        employer_name,
        employer_id,
        candidate_id, } = newEntry

    try {
        const [data] = await db.query('SELECT * FROM EmploymentHistories WHERE employment_history_id = ?', [
            employment_history_id,
        ])
        const oldEntry = data[0]

        if (!lodash.isEqual(newEntry, oldEntry)) {
            // console.log("NewEntry: ", newEntry)
            const query = 'UPDATE EmploymentHistories SET position=?, start_date=?, end_date=?, currently_employed=?, employer_name=?, employer_id=?, candidate_id=? WHERE employment_history_id=?'
            const values = [
                position,
                start_date,
                end_date,
                currently_employed,
                employer_name,
                employer_id,
                candidate_id,
                employment_history_id,
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
        console.log('Error updating EmploymentHistories', error)
        res
            .status(500)
            .json({ error: `Error updating the entry with ID ${employment_history_id}`})
    }
}

// Deletes an EmploymentHistories entity
const deleteEmploymentHistory = async (req, res) => {
    const { params, body } = req
    // ? Are we passing a boyd when we call this?
    const { id: employment_history_id } = params

    try {
        // Ensure the entry exists
        const [isExisting] = await db.query(
            'SELECT 1 FROM EmploymentHistories WHERE employment_history_id = ?',
            [employment_history_id]
        )

        // If the entry doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send('Entry not found')
        }

        const [response] = await db.query(
            'DELETE FROM EmploymentHistories WHERE employment_history_id = ?',
            [employment_history_id]
        )

        console.log(
            'Deleted',
            response.affectedRows,
            'rows from EmploymentHistories table'
        )

        // Return the appropriate status code
        res
            .status(204)
            .json({ message: 'EmploymentHistory deleted successfully' })
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
    getEmploymentHistories,
    createEmploymentHistory,
    updateEmploymentHistory,
    deleteEmploymentHistory,
}
