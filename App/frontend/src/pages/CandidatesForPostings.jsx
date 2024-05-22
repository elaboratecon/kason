import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI } from '../helperFunctions'

export const CandidatesForPostings = ({ apiURL }) => {
    const [candidatesForPostings, setCandidatesForPostings] = useState([])

    function fetchCandidatesForPostings() {
        readFromAPI(apiURL).then((res) => {
            setCandidatesForPostings(res)
        })
    }

    useEffect(() => {
        fetchCandidatesForPostings()
    }, [])

    return (
        <>
            <div style={{marginBottom: '1rem'}}>
                <a href="#" onClick={() => console.log('showAllForms')}>Show All Forms</a>
            </div>

            <section id="browseCandidatesForPostings">
            <h2>Browse CandidatesForPostings</h2>
            <table className="table table-light table-bordered table-hover">
                <thead className="table-secondary">
                    <tr>
                        <th className="text-center">
                            <a href="#" onClick={() => console.log('addNewCandidateForPosting')}>New</a>
                        </th>
                        <th></th>
                        <th className="text-center">candidate_for_posting_id</th>
                        <th>posting_position</th>
                        <th>candidate_full_name</th>
                    </tr>
                </thead>
                <tbody>
                        {candidatesForPostings.map((posting, index) => (
                            <TableRow data={posting} key={index.toString()} />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const TableRow = ({ data }) => {
    const {
        candidate_for_posting_id: candidateForPostingID,
        posting_position: postingPosition,
        candidate_full_name: candidateFullName,
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" className="text-center" onClick={() => console.log('editCandidateForPosting')}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" className="text-center" onClick={() => console.log('deleteCandidateForPosting')}>Delete</a>
            </td>
            <td className="text-center">{candidateForPostingID}</td>
            <td>{postingPosition}</td>
            <td>{candidateFullName}</td>
        </tr>
    )
}
