import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI } from '../helperFunctions'

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

export const Candidates = ({ apiURL }) => {
    const [candidates, setCandidates] = useState([])

    function fetchCandidates() {
        readFromAPI(apiURL).then((res) => {
            setCandidates(res)
        })
    }

    useEffect(() => {
        fetchCandidates()
    }, [])

    return (
        <>
            <div style={{marginBottom: '1rem'}}>
                <a href="#" onClick={() => console.log('showAllForms')}>Show All Forms</a>
            </div>

            <section id="browseCandidates">
                <h2>Browse Candidates</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => console.log('addNewCandidate')}>New</a>
                            </th>
                            <th className="text-center">candidate_id</th>
                            <th>first_name</th>
                            <th>last_name</th>
                            <th>profession</th>
                            <th>skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate, index) => (
                            <TableRow data={candidate} key={index.toString()} />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const TableRow = ({ data }) => {
    const {
        candidate_id: candidateID,
        first_name: firstName,
        last_name: lastName,
        profession,
        skills,
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" onClick={() => console.log('editCandidate')}>Edit</a>
            </td>
            <td className="text-center">{candidateID}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{profession}</td>
            <td>{skills}</td>
        </tr>
    )
}