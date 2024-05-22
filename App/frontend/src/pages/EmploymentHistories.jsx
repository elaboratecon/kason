import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, formatDate } from '../helperFunctions'

export const EmploymentHistories = ({ apiURL }) => {
    const [employmentHistories, setEmploymentHistories] = useState([])

    function fetchEmploymentHistories() {
        readFromAPI(apiURL).then((res) => {
            setEmploymentHistories(res)
        })
    }

    useEffect(() => {
        fetchEmploymentHistories()
    }, [])

    return (
        <>
            <div style={{marginBottom: '1rem'}}>
                <a href="#" onClick={() => console.log('showAllForms')}>Show All Forms</a>
            </div>

            <section id="browseEmploymentHistories">
                <h2>Browse EmploymentHistories</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => console.log('addNewEmploymentHistory')}>New</a>
                            </th>
                            <th></th>
                            <th className="text-center">employment_history_id</th>
                            <th>candidate_full_name</th>
                            <th>position</th>
                            <th>employer_name_from_database</th>
                            <th>employer_name</th>
                            <th>start_date</th>
                            <th>start_date</th>
                            <th>currently_employed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentHistories.map((posting, index) => (
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
        employment_history_id: employmentHistoryID,
        position,
        candidate_full_name: candidateFullName,
        employer_name_from_database: employerNameFromDatabase,
        employer_name: employerName,
        start_date: startDate,
        end_date: endDate,
        currently_employed: currentlyEmployed,
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" onClick={() => console.log('editEmploymentHistory')}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" onClick={() => console.log('deleteEmploymentHistory')}>Delete</a>
            </td>
            <td className="text-center">{employmentHistoryID}</td>
            <td>{candidateFullName}</td>
            <td>{position}</td>
            <td>
                {employerNameFromDatabase === null ? 'NULL' : employerNameFromDatabase}
            </td>
            <td>
                {employerName === null ? 'NULL' : employerName}
            </td>
            <td>{formatDate(startDate)}</td>
            <td>{formatDate(endDate)}</td>
            <td className="text-center">
                {currentlyEmployed === 1 ? 'True' : 'False'}
            </td>
        </tr>
    )
}
