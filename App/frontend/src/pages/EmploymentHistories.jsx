import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, formatDate } from '../helperFunctions'

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

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
            <section id="browseEmploymentHistories">
                <h2>Browse EmploymentHistories</h2>
                <p> Browse Employement Histories. See which Candidate worked at which Employer, when they began and ended their position <br />
                — or whether they're still in that role. Employers can be from our database, or entered manually with a null foreign key. <br /><br />
                You can create new Employment History items, as well as edit or delete existing ones. <br />
                Each Employment History must be linked to a candidate - keep in mind deleting that candidate will delete it.</p>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => console.log('addNewEmploymentHistory')}><b>NEW</b></a>
                            </th>
                            <th className="text-center">Delete</th>
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
