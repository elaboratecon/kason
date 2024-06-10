// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateField } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'


export const Candidates = ({ apiURL }) => {
    const [candidates, setCandidates] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [formState, setFormState] = useState({})
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    function fetchCandidates() {
        readFromAPI(apiURL).then((res) => {
            setCandidates(res)
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
    function addCandidate() {
        setIsWriting(true)
        console.log("Formstate: ", formState)
        writeToAPI({
            apiURL,
            method: 'POST',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchCandidates()
            toggleAdd()
        })
    }

    function editCandidate() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.candidate_id}`,
            method: 'PUT',
            data: formState
        }).then((res) => {
            setIsWriting(false)
            fetchCandidates()
            toggleEdit()
        })
    }

    function deleteCandidate(){
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.candidate_id}`,
            method: 'DELETE'
        }).then((res) => {
            setIsWriting(false)
            fetchCandidates()
            toggleDelete()
        })
    }

    // trigger modal functions
    function triggerEditModalById(rowData) {
        const {
            candidate_id: candidateID,
            first_name: firstName,
            last_name: lastName,
            profession,
            skills,
        } = rowData

        setFormState({
            candidate_id: candidateID,
            first_name: firstName,
            last_name: lastName,
            profession,
            skills,
        })
        setIsOpenEditModal(!isOpenEditModal)
    }

    function triggerDeleteModalById(rowData) {
        const {
            candidate_id: candidateID,
            first_name: firstName,
            last_name: lastName,
            profession,
            skills,
        } = rowData

        setFormState({
            candidate_id: candidateID,
            first_name: firstName,
            last_name: lastName,
            profession,
            skills,
        })
        setIsOpenDeleteModal(!isOpenDeleteModal)
    }

    useEffect(() => {
        fetchCandidates()
    }, [])

    return (
        <>
            <LoaderOverlay enable={isWriting} />

            {/* MODAL: Add New Candidate */}
            <Modal
                modalSettings={{
                    isOpen: isOpenAddModal,
                    toggle: toggleAdd,
                }}
                headerLabel="Add Candidate"
                buttonLabel="Add Candidate"
                onClick={addCandidate}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Add Candidate</legend>

                        {/* <first_name */}
                        <label htmlFor="first_name" className="required">First Name: </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={formState?.first_name ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* <last_name */}
                        <label htmlFor="last_name" className="required">Last Name: </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={formState?.last_name ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* profession */}
                        <label htmlFor="profession" className="required">Profession: </label>
                        <input
                            type="text"
                            name="profession"
                            id="profession"
                            value={formState?.profession ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* skills */}
                        <label htmlFor="skills">Skills: </label>
                        <input
                            type="text"
                            name="skills"
                            id="skills"
                            value={formState?.skills ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            required
                        />
                    </fieldset>
                </form>
            </Modal>

            {/* MODAL: Edit Existing Candidate */}
            <Modal
                modalSettings={{
                    isOpen: isOpenEditModal,
                    toggle: toggleEdit,
                }}
                headerLabel="Edit Candidate"
                buttonLabel="Edit Candidate"
                onClick={editCandidate}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Edit Candidate</legend>

                        {/* candidate_id */}
                        <span>Candidate ID: {formState.candidate_id}</span>
                        <br />
                        {/* <first_name */}
                        <label htmlFor="first_name" className="required">First Name: </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={formState?.first_name ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* <last_name */}
                        <label htmlFor="last_name" className="required">Last Name: </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={formState?.last_name ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* profession */}
                        <label htmlFor="profession" className="required">Profession: </label>
                        <input
                            type="text"
                            name="profession"
                            id="profession"
                            value={formState?.profession ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* skills */}
                        <label htmlFor="skills">Skills: </label>
                        <input
                            type="text"
                            name="skills"
                            id="skills"
                            value={formState?.skills ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            required
                        />

                    </fieldset>
                </form>
            </Modal>

            {/* MODAL: Delete Existing Candidate */}
            <Modal
                modalSettings={{
                    isOpen: isOpenDeleteModal,
                    toggle: toggleDelete,
                }}
                headerLabel="Delete Candidate"
                buttonLabel="Delete Candidate"
                onClick={deleteCandidate}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Delete Candidate</legend>
                        <span>Candidate ID: {formState.candidate_id}</span>
                        <br />
                        <span>First Name: {formState.first_name}</span>
                        <br />
                        <span>Last Name: {formState.last_name}</span>
                        <br />
                        <span>Profession: {formState.profession}</span>
                        <br />
                        <span>Skills: {formState?.skills ?? 'NULL'}</span>
                        
                        <br />
                    </fieldset>
                </form>
            </Modal>

            <section id="browseCandidates">
                <h2>Browse Candidates</h2>
                <p>Browse Candidates, create new ones, and edit existing ones.</p>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => setIsOpenAddModal(true)}><b>NEW</b></a>
                            </th>
                            <th className="text-center">Delete</th>
                            <th className="text-center">candidate_id</th>
                            <th>first_name</th>
                            <th>last_name</th>
                            <th>profession</th>
                            <th>skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate, index) => (
                            <TableRow data={candidate} 
                            key={index.toString()} 
                            triggerDeleteModalById={triggerDeleteModalById} 
                            triggerEditModalById={triggerEditModalById} />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const TableRow = ({ data, triggerEditModalById, triggerDeleteModalById }) => {
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
                <a href="#" onClick={() => triggerEditModalById(data)}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" onClick={() => triggerDeleteModalById(data)}>Delete</a>
            </td>
            <td className="text-center">{candidateID}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{profession}</td>
            <td>{skills === null ? 'NULL' : skills}</td>
        </tr>
    )
}