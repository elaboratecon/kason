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
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [editState, setEditState] = useState({})
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [deleteState, setDeleteState] = useState({})

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

    function toggleEdit() {
        setIsOpenEditModal(!isOpenEditModal)
        setEditState({})
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

    function triggerEditModalById(rowData) {

        setEditState({employer_id: rowData.employer_id,
            name: rowData.name,
            location: rowData.location})
        setIsOpenEditModal(!isOpenEditModal)

    }

    function editEmployer() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${editState.employer_id}`,
            method: 'PUT',
            data: editState
        }).then((res) => {
            setIsWriting(false)
            fetchEmployers()
            toggleEdit()
        })
    }
    
    function toggleDelete(){
        setIsOpenDeleteModal(!isOpenDeleteModal)
        setDeleteState({})
    }

    function triggerDeleteModalById(rowData) {
        setDeleteState({
            employer_id: rowData.employer_id,
            name: rowData.name,
            location: rowData.location
        })
        setIsOpenDeleteModal(!isOpenDeleteModal)
    }

    function deleteEmployer(){
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${deleteState.employer_id}`,
            method: 'DELETE',
            data: deleteState
        }).then((res) => {
            setIsWriting(false)
            fetchEmployers()
            toggleDelete()
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

                        {/* <Prompted ID */}
                        <label htmlFor="employer_id" className="required">id</label>
                        <input
                            type="number"
                            name="id"
                            id="id"
                            value={editState?.employer_id ?? ''}
                            onChange={(e) => updateField(e, setEditState)}
                            aria-required="true"
                            required
                        />

                        {/* <name */}
                        <label htmlFor="name" className="required">name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={editState?.name ?? ''}
                            onChange={(e) => updateField(e, setEditState)}
                            aria-required="true"
                            required
                        />

                        {/* location */}
                        <label htmlFor="location" className="required">location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={editState?.location ?? ''}
                            onChange={(e) => updateField(e, setEditState)}
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

                        {/* <Prompted ID */}
                        <label htmlFor="employer_id" className="required">id</label>
                        <input
                            type="number"
                            name="id"
                            id="id"
                            value={deleteState?.employer_id ?? ''}
                            onChange={(e) => updateField(e, setEditState)}
                            aria-required="true"
                            required
                        />

                        {/* <name */}
                        <label htmlFor="name" className="required">name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={deleteState?.name ?? ''}
                            onChange={(e) => updateField(e, setEditState)}
                            aria-required="true"
                            required
                        />

                        {/* location */}
                        <label htmlFor="location" className="required">location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={deleteState?.location ?? ''}
                            onChange={(e) => updateField(e, setEditState)}
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
                            <th>
                                Delete
                            </th>
                            <th className="text-center">employer_id</th>
                            <th>name</th>
                            <th>location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employers.map((employer, index) => (
                            <TableRow data={employer} key={index.toString()} triggerDeleteModalById= {triggerDeleteModalById} triggerEditModalById={triggerEditModalById}/>
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