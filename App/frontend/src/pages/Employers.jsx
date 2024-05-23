import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateField } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'

export const Employers = ({ apiURL }) => {
    // state
    const [employers, setEmployers] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [addState, setAddState] = useState({})

    // functions
    function fetchEmployers() {
        readFromAPI(apiURL).then((res) => {
            setEmployers(res)
        })
    }

    function toggleAdd() {
        setIsOpenAddModal(!isOpenAddModal)
        setAddState({})
    }

    function addEmplyoyer() {
        setIsWriting(true)
        writeToAPI({
            apiURL,
            method: 'POST',
            data: addState,
        }).then((res) => {
            setIsWriting(false)
            fetchEmployers()
            toggleAdd()
        })
    }

    useEffect(() => {
        fetchEmployers()
    }, [employers])
    
    return (
        <>
            <LoaderOverlay enable={isWriting} />

            {/* MODAL: Add New Employer */}
            <Modal
                modalSettings={{
                    isOpen: isOpenAddModal,
                    toggle: toggleAdd,
                }}
                headerLabel="Add Employer"
                buttonLabel="Add Employee"
                onClick={addEmplyoyer}
    >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Add Employer</legend>

                        {/* <name */}
                        <label htmlFor="name" className="required">name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={addState?.name ?? ''}
                            onChange={(e) => updateField(e, setAddState)}
                            aria-required="true"
                            required
                        />

                        {/* location */}
                        <label htmlFor="location" className="required">location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={addState?.location ?? ''}
                            onChange={(e) => updateField(e, setAddState)}
                            aria-required="true"
                            required
                        />
                    </fieldset>
                </form>
            </Modal>

            <section id="browseEmployers">
                <h2>Browse Employers</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => setIsOpenAddModal(true)}>New</a>
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
            <td>{location === null ? 'NULL' : location}</td>
        </tr>
    )
}