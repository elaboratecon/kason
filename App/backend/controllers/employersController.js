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

// Returns all rows of employers in Employers
const getEmployers = async (req, res) => {
    try {
        // Select all rows from the "Employers" table
        const query = 'SELECT * FROM Employers'
        // Execute the query using the "db" object from the configuration file
        const [rows] = await db.query(query)
        // Send back the rows to the client
        res
            .status(200)
            .json(rows)
    } catch (error) {
        console.error('Error fetching employers from the database:', error)
        res
            .status(500)
            .json({ error: 'Error fetching employers' })
    }
}

// Returns a single employer by their unique ID from Employers
const getEmployerByID = async (req, res) => {
    try {
        const employerID = req.params.id
        const query = 'SELECT * FROM Employers WHERE id = ?'
        const [result] = await db.query(query, [employerID])
        // Check if employer was found
        if (result.length === 0) {
            return res.status(404).json({ error: 'Employer not found' })
        }
        const employer = result[0]
        res.json(employer)
    } catch (error) {
        console.error('Error fetching employer from the database:', error)
        res
            .status(500)
            .json({ error: 'Error fetching employer' })
    }
}

// Returns status of creation of new employer in Employers
const createEmployer = async (req, res) => {
    try {
        const { body } = req
        const { name } = body
        let { location } = body

        // null out location if empty string or undefined is detected
        if (location){
            location.trim() === '' ? null : location.trim()
        } else{
            location = null
        }
        
        const query =
            'INSERT INTO Employers (name, location) VALUES (?, ?)'

        // this needs some love. We should be getting everything back, just like the getEmployers SELECT
        const response = await db.query(query, [
            name,
            location,
        ])
        res
            .status(201)
            .json(response)
    } catch (error) {
        // Print the error for the dev
        console.error('Error creating employer:', error)
        // Inform the client of the error
        res.status(500).json({ error: 'Error creating employer' })
    }
}


const updateEmployer = async (req, res) => {
    const { params, body } = req
    const { id } = params

    // Get the employer ID
    const employerID = id
    
    // Get the employer object
    const newEmployer = body
    console.log("newEmployer Location: ", newEmployer.location)

    try {
        const [data] = await db.query('SELECT * FROM Employers WHERE employer_id = ?', [
            employerID,
        ])

        const oldEmployer = data[0]

        // If any attributes are not equal, perform update
        if (!lodash.isEqual(newEmployer, oldEmployer)) {
            console.log("NewEmployer: ", newEmployer)
            const query =
                'UPDATE Employers SET name=?, location=? WHERE employer_id=?'

            // Homeoworld is NULL-able FK in Employers, has to be valid INT FK ID or NULL
            console.log("Update Query: ", query)
            // Returns null or returns false: incorrect const location = newEmployer.location.trim() === '' && null
            location = newEmployer.location.trim() === '' ? null : newEmployer.location.trim()
            // newEmployer.location throws error if no location was passed

            const values = [
                newEmployer.name,
                location,
                employerID,
            ]
            console.log("valuesArr: ", values)

            // Perform the update
            await db.query(query, values)
            // Inform client of success and return 
            return res.json({ message: 'Employer updated successfully.' })
        }

        res.json({ message: 'Employer details are the same, no update' })
    } catch (error) {
        console.log('Error updating employer', error)
        res
            .status(500)
            .json({ error: `Error updating the employer with id ${employerID}` })
    }
}

// Endpoint to delete a employer from the database
const deleteEmployer = async (req, res) => {
    const { params } = req
    const { id } = params

    console.log('Deleting employer with id:', id)
    const employerID = id

    try {
        // Ensure the employer exists
        const [isExisting] = await db.query(
            'SELECT 1 FROM Employers WHERE employer_id = ?',
            [employerID]
        )

        // If the employer doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send('Employer not found')
        }

        // ?? Delete related records from the intersection table (see FK contraints bsg_cert_people)
        // Delete the employer from Employers
        const [response] = await db.query(
            'DELETE FROM Employers WHERE employer_id = ?',
            [employerID]
        )

        console.log(
            'Deleted',
            response.affectedRows,
            'rows from Employers table'
        )

        // Return the appropriate status code
        res.status(204).json({ message: 'Employer deleted successfully' })
        // 204 must not have a body, it will ignore the attached .json(...)
    } catch (error) {
        console.error('Error deleting employer from the database:', error)
        res.status(500).json({ error: error.message })
    }
}

// Export the functions as methods of an object
module.exports = {
    getEmployers,
    getEmployerByID,
    createEmployer,
    updateEmployer,
    deleteEmployer,
}
