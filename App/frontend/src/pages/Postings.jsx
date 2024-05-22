import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI } from '../helperFunctions'

export const Postings = ({ apiURL }) => {
    const [postings, setPostings] = useState([])

    function fetchPostings() {
        readFromAPI(apiURL).then((res) => {
            setPostings(res)
        })
    }

    useEffect(() => {
        fetchPostings()
    }, [])

    return (
        <>
            <div style={{marginBottom: '1rem'}}>
                <a href="#" onClick={() => console.log('showAllForms')}>Show All Forms</a>
            </div>

            <section id="browsePostings">
                <h2>Browse Postings</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => console.log('addNewPosting')}>New</a>
                            </th>
                            <th></th>
                            <th className="text-center">posting_id</th>
                            <th>position</th>
                            <th>employer_name</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postings.map((posting, index) => (
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
        posting_id: postingID,
        position,
        description,
        employer_name: employerName,
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" onClick={() => console.log('editPosting')}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" onClick={() => console.log('deletePosting')}>Delete</a>
            </td>
            <td className="text-center">{postingID}</td>
            <td>{position}</td>
            <td>{employerName}</td>
            <td>{description}</td>
        </tr>
    )
}