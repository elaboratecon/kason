import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI } from '../helperFunctions'

export const Employers = ({ apiURL }) => {
    const [employers, setEmployers] = useState([])

    function fetchEmployers() {
        readFromAPI(apiURL).then((res) => {
            setEmployers(res)
        })
    }

    useEffect(() => {
        fetchEmployers()
    }, [])
    
    return (
        <>
            <div style={{marginBottom: '1rem'}}>
                <a href="#" onClick={() => console.log('showAllForms')}>Show All Forms</a>
            </div>

            <section id="browseEmployers">
                <h2>Browse Employers</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => console.log('addNewEmployer')}>New</a>
                            </th>
                            <th className="text-center">employer_id</th>
                            <th>name</th>
                            <th>location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employers.map((employer, index) => (
                            <TableRow data={employer} key={index.toString()} />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const TableRow = ({ data }) => {
    const {
        employer_id: employerID,
        name,
        location
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" onClick={() => console.log('editEmployer')}>Edit</a>
            </td>
            <td className="text-center">{employerID}</td>
            <td>{name}</td>
            <td>{location}</td>
        </tr>
    )
}