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

        // null out location if empty string is detected
        if (location.trim() === '') location = null

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

    try {
        const [data] = await db.query('SELECT * FROM Employers WHERE id = ?', [
            employerID,
        ])

        const oldEmployer = data[0]

        // If any attributes are not equal, perform update
        if (!lodash.isEqual(newEmployer, oldEmployer)) {
            const query =
                'UPDATE Employers SET name=?, location=? WHERE id=?'

            // Homeoworld is NULL-able FK in Employers, has to be valid INT FK ID or NULL
            const location = newEmployer.location.trim() === '' && null

            const values = [
                newEmployer.name,
                location,
                employerID,
            ]

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

// Endpoint to delete a emloyer from the database
const deleteEmployer = async (req, res) => {
    const { params } = req
    const { id } = params

    console.log('Deleting employer with id:', id)
    const employerID = id

    try {
        // Ensure the employer exitst
        const [isExisting] = await db.query(
            'SELECT 1 FROM Employers WHERE id = ?',
            [employerID]
        )

        // If the employer doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send('Employer not found')
        }

        // Delete related records from the intersection table (see FK contraints bsg_cert_people)
        const [response] = await db.query(
            'DELETE FROM bsg_cert_people WHERE pid = ?',
            [employerID]
        )

        console.log(
            'Deleted',
            response.affectedRows,
            'rows from bsg_cert_people intersection table'
        )

        // Delete the employer from Employers
        await db.query('DELETE FROM Employers WHERE id = ?', [employerID])

        // Return the appropriate status code
        res.status(204).json({ message: 'Employer deleted successfully' })
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
