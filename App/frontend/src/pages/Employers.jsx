import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateField } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'

export const Employers = ({ apiURL }) => {
    // state
    const [employers, setEmployers] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [formState, setFormState] = useState({})
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    // fetch data function
    function fetchEmployers() {
        readFromAPI(apiURL).then((res) => {
            setEmployers(res)
        })
    }

    // toggle functions
    function toggleAdd() {
        setIsOpenAddModal(!isOpenAddModal)
        setFormState({})
    }

    function toggleEdit() {
        setIsOpenEditModal(!isOpenEditModal)
        setFormState({})
    }

    function toggleDelete(){
        setIsOpenDeleteModal(!isOpenDeleteModal)
        setFormState({})
    }

    // modify database functions
    function addEmplyoyer() {
        setIsWriting(true)
        writeToAPI({
            apiURL,
            method: 'POST',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchEmployers()
            toggleAdd()
        })
    }

    function editEmployer() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.employer_id}`,
            method: 'PUT',
            data: formState
        }).then((res) => {
            setIsWriting(false)
            fetchEmployers()
            toggleEdit()
        })
    }

    function deleteEmployer(){
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.employer_id}`,
            method: 'DELETE'
        }).then((res) => {
            setIsWriting(false)
            fetchEmployers()
            toggleDelete()
        })
    }

    // trigger modal functions
    function triggerEditModalById(rowData) {
        const {
            employer_id: employerID,
            name,
            location,
        } = rowData

        setFormState({
            employer_id: employerID,
            name: name,
            location: location
        })
        setIsOpenEditModal(!isOpenEditModal)
    }

    function triggerDeleteModalById(rowData) {
        const {
            employer_id: employerID,
            name,
            location,
        } = rowData

        setFormState({
            employer_id: employerID,
            name: name,
            location: location
        })
        setIsOpenDeleteModal(!isOpenDeleteModal)
    }

    // useEffects
    useEffect(() => {
        fetchEmployers()
    }, [])

    useEffect(() => {
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
                buttonLabel="Add Employer"
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
                            value={formState?.name ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* location */}
                        <label htmlFor="location" className="required">location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formState?.location ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />
                    </fieldset>
                </form>
            </Modal>

            {/* MODAL: Edit Existing Employer */}
            <Modal
                modalSettings={{
                    isOpen: isOpenEditModal,
                    toggle: toggleEdit,
                }}
                headerLabel="Edit Employer"
                buttonLabel="Edit Employer"
                onClick={editEmployer}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Edit Employer</legend>
                        <br />
                        <span>Employer Id: {formState.employer_id}</span>
                        <br />
                        {/* <name */}
                        <label htmlFor="name" className="required">name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formState?.name ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* location */}
                        <label htmlFor="location" className="required">location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formState?.location ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />
                    </fieldset>
                </form>
            </Modal>

            {/* MODAL: Delete Existing Employer */}
            <Modal
                modalSettings={{
                    isOpen: isOpenDeleteModal,
                    toggle: toggleDelete,
                }}
                headerLabel="Delete Employer"
                buttonLabel="Delete Employer"
                onClick={deleteEmployer}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Delete Employer</legend>
                        <span>Employer Id: {formState.employer_id}</span>
                        <br />
                        <span>Employer Name: {formState.name}</span>
                        <br />
                        <span>Employer Location: {formState?.location ?? ''}</span>
                        <br />
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
                            <th className="text-center">
                                Delete
                            </th>
                            <th className="text-center">employer_id</th>
                            <th>name</th>
                            <th>location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employers.map((employer, index) => (
                            <TableRow
                                data={employer}
                                triggerDeleteModalById={triggerDeleteModalById}
                                triggerEditModalById={triggerEditModalById}
                                key={index.toString()}
                            />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const TableRow = ({ data, triggerEditModalById, triggerDeleteModalById }) => {
    const {
        employer_id: employerID,
        name,
        location
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" onClick={() => triggerEditModalById(data)}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" onClick={() => triggerDeleteModalById(data)}>Delete</a>
            </td>
            <td className="text-center">{employerID}</td>
            <td>{name}</td>
            <td>{location === null ? 'NULL' : location}</td>
        </tr>
    )
}