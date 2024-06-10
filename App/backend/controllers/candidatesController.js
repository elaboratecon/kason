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

// Returns a single candidate by their unique ID from Candidates
const getCandidateByID = async (req, res) => {
    try {
        const candidateID = req.params.id
        const query = 'SELECT * FROM Candidates WHERE id = ?'
        const [result] = await db.query(query, [candidateID])
        // Check if candidate was found
        if (result.length === 0) {
            return res.status(404).json({ error: 'Candidate not found' })
        }
        const candidate = result[0]
        res.json(candidate)
    } catch (error) {
        console.error('Error fetching candidate from the database:', error)
        res
            .status(500)
            .json({ error: 'Error fetching candidate' })
    }
}

// Returns status of creation of new candidate in Candidates
const createCandidate = async (req, res) => {
    console.log("Trying to create")
    try {
        const { body } = req
        console.log("body: ", body)
        const { first_name } = body
        const { last_name } = body
        const { profession } = body
        let { skills } = body

        // null out location if empty string or undefined is detected
        if (skills){
            skills.trim() === '' ? null: skills.trim()
        } else{
            skills = null
        }


        const query =
            'INSERT INTO Candidates (first_name, last_name, profession, skills) VALUES (?, ?, ?, ?)'

        // this needs some love. We should be getting everything back, just like the getCandidates SELECT
        const response = await db.query(query, [
            first_name,
            last_name,
            profession,
            skills,
        ])
        res
            .status(201)
            .json(response)
    } catch (error) {
        // Print the error for the dev
        console.error('Error creating candidate:', error)
        // Inform the client of the error
        res.status(500).json({ error: 'Error creating candidate' })
    }
}


const updateCandidate = async (req, res) => {
    const { params, body } = req
    const { id } = params
    const { first_name } = body
    const { last_name } = body
    const { profession } = body
    let { skills } = body

    // Get the candidate ID
    const candidateID = id
    
    // Get the candidate object
    const newCandidate = body

    try {
        const [data] = await db.query('SELECT * FROM Candidates WHERE candidate_id = ?', [
            candidateID,
        ])

        const oldCandidate = data[0]

        // If any attributes are not equal, perform update
        if (!lodash.isEqual(newCandidate, oldCandidate)) {
            console.log("NewCandidate: ", newCandidate)
            const query =
                'UPDATE Candidates SET first_name=?, last_name=?, profession=?, skills=? WHERE candidate_id=?'

            console.log("Update Query: ", query)
            // below line copy pasted - double check? What do other comments mean?
            // Returns null or returns false: incorrect const location = newEmployer.location.trim() === '' && null
            skills = newCandidate.skills.trim() === '' ? null : newCandidate.skills.trim()
            // newEmployer.location throws error if no location was passed

            const values = [
                first_name,
                last_name,
                profession,
                skills,
                candidateID,
            ]
            console.log("valuesArr: ", values)

            // Perform the update
            await db.query(query, values)
            // Inform client of success and return 
            return res.json({ message: 'Candidate updated successfully.' })
        }

        res.json({ message: 'Candidate details are the same, no update' })
    } catch (error) {
        console.log('Error updating Candidate', error)
        res
            .status(500)
            .json({ error: `Error updating the candidate with id ${candidateID}` })
    }
}

// Endpoint to delete a candidate from the database
const deleteCandidate = async (req, res) => {
    const { params } = req
    const { id } = params

    console.log('Deleting candidate with id:', id)
    const candidateID = id

    try {
        // Ensure the candidate exists
        const [isExisting] = await db.query(
            'SELECT 1 FROM Candidates WHERE candidate_id = ?',
            [candidateID]
        )

        // If the candidate doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send('Candidate not found')
        }

        // ?? Delete related records from the intersection table (see FK contraints bsg_cert_people)
        // Delete the candidate from Candidates
        const [response] = await db.query(
            'DELETE FROM Candidates WHERE candidate_id = ?',
            [candidateID]
        )

        console.log(
            'Deleted',
            response.affectedRows,
            'rows from Candidates table'
        )

        // Return the appropriate status code
        res.status(204).json({ message: 'Candidate deleted successfully' })
        // 204 must not have a body, it will ignore the attached .json(...)
    } catch (error) {
        console.error('Error deleting candidate from the database:', error)
        res.status(500).json({ error: error.message })
    }
}

// Export the functions as methods of an object
module.exports = {
    getCandidates,
    getCandidateByID,
    createCandidate,
    updateCandidate,
    deleteCandidate,
}
