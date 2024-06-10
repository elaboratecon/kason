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

// Returns all rows of postings in Postings
const getPostings = async (req, res) => {
    try {
        // Select all rows from the "Postings" table
        const query1 = 'SELECT posting_id, position, description, Postings.employer_id, Employers.name AS employer_name, Employers.location AS employer_location FROM Postings INNER JOIN Employers ON Employers.employer_id = Postings.employer_id;'

        // Select employer info for dropdowns
        const query2 = 'SELECT * FROM Employers;'

        // Execute the query using the "db" object from the configuration file
        const [resp1] = await db.query(query1)
        const [resp2] = await db.query(query2)

        // Send back the rows to the client
        res
            .status(200)
            .json({
                postings: resp1,
                employers: resp2,
            })
    } catch (error) {
        console.error('Error fetching postings from the database:', error)
        res.status(500).json({ error: 'Error fetching postings' })
    }
}

// Returns a single posting by their unique ID from Postings
const getPostingByID = async (req, res) => {
    try {
        const postingID = req.params.id
        const query = 'SELECT posting_id, position, description, Employers.name AS employer_name, Employers.location AS employer_location FROM Postings INNER JOIN Employers ON Employers.employer_id = Postings.employer_id WHERE posting_id = ?;'
        const [result] = await db.query(query, [postingID])
        // Check if posting was found
        if (result.length === 0) {
            return res.status(404).json({ error: 'Posting not found' })
        }
        const posting = result[0]
        res.json(posting)
    } catch (error) {
        console.error('Error fetching posting from the database:', error)
        res
            .status(500)
            .json({ error: 'Error fetching posting' })
    }
}

// Returns status of creation of new posting in Postings
const createPosting = async (req, res) => {
    try {
        const { body } = req
        console.log(body)
        const { position } = body
        let { description } = body
        const { employer_id } = body

        // null out location if empty string is detected
        if (description.trim() === '') description = null

        const query =
            'INSERT INTO Postings (position, description, employer_id) VALUES (?, ?, ?)'

        // this needs some love. We should be getting everything back, just like the getPostings SELECT
        const response = await db.query(query, [
            position,
            description,
            employer_id,
        ])
        res
            .status(201)
            .json(response)
    } catch (error) {
        // Print the error for the dev
        console.error('Error creating posting:', error)
        // Inform the client of the error
        res.status(500).json({ error: 'Error creating posting' })
    }
}


const updatePosting = async (req, res) => {
    const { params, body } = req
    const { id: postingID } = params
    const { position, employer_id: employerID } = body
    let { description } = body
    
    // Get the posting object
    const newPosting = body

    try {
        const [data] = await db.query('SELECT posting_id, position, description, Employers.name AS employer_name, Employers.location AS employer_location FROM Postings INNER JOIN Employers ON Employers.employer_id = Postings.employer_id WHERE posting_id = ?;', [
            postingID,
        ])

        const oldPosting = data[0]

        // If any attributes are not equal, perform update
        if (!lodash.isEqual(newPosting, oldPosting)) {
            console.log("NewPosting: ", newPosting)
            const query =
                'UPDATE Postings SET position=?, description=?, employer_id=? WHERE posting_id = ?;'

            console.log("Update Query: ", query)
            // Recheck line below and comments later
            // Returns null or returns false: incorrect const location = newEmployer.location.trim() === '' && null
            description = newPosting.description.trim() === '' ? null : newPosting.description.trim()
            // newEmployer.location throws error if no location was passed

            const values = [
                position,
                description,
                employerID,
                postingID,
            ]
            console.log("valuesArr: ", values)

            // Perform the update
            await db.query(query, values)
            // Inform client of success and return 
            return res.json({ message: 'Posting updated successfully.' })
        }

        res.json({ message: 'Posting details are the same, no update' })
    } catch (error) {
        console.log('Error updating posting', error)
        res
            .status(500)
            .json({ error: `Error updating the posting with id ${postingID}` })
    }
}

// Endpoint to delete a posting from the database
const deletePosting = async (req, res) => {
    const { params } = req
    const { id } = params

    console.log('Deleting posting with id:', id)
    const postingID = id

    try {
        // Ensure the posting exists
        const [isExisting] = await db.query(
            'SELECT 1 FROM Postings WHERE posting_id = ?',
            [postingID]
        )

        // If the employer doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send('Posting not found')
        }

        // ?? Delete related records from the intersection table (see FK contraints bsg_cert_people)
        // Delete the posting from Postings
        const [response] = await db.query(
            'DELETE FROM Postings WHERE posting_id = ?',
            [postingID]
        )

        console.log(
            'Deleted',
            response.affectedRows,
            'rows from Postings table'
        )

        // Return the appropriate status code
        res.status(204).json({ message: 'Posting deleted successfully' })
        // 204 must not have a body, it will ignore the attached .json(...)
    } catch (error) {
        console.error('Error deleting posting from the database:', error)
        res.status(500).json({ error: error.message })
    }
}

// Export the functions as methods of an object
module.exports = {
    getPostings,
    getPostingByID,
    createPosting,
    updatePosting,
    deletePosting,
}
