// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateDropdown } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'

export const CandidatesForPostings = ({ apiURL }) => {
    const [candidatesForPostings, setCandidatesForPostings] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [formState, setFormState] = useState({})
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    // For dropdown selection in Add/Edit
    const [postingsPositions, setPostingsPositions] = useState([])
    const [candidatesFullNames, setCandidatesFullNames] = useState([])

    // default data call
    function fetchCandidatesForPostings() {
        readFromAPI(apiURL).then((res) => {
            const {
                candidates_for_postings: candidatesForPostings,
                postings_positions: postingsPositions,
                candidates_full_names: candidatesFullNames,
            } = res

            setCandidatesForPostings(candidatesForPostings)
            setPostingsPositions(postingsPositions)
            setCandidatesFullNames(candidatesFullNames)
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

    function toggleDelete() {
        setIsOpenDeleteModal(!isOpenDeleteModal)
        setFormState({})
    }

    function triggerEditModalById(rowData) {
        setFormState(rowData)
        setIsOpenEditModal(!isOpenEditModal)
    }

    function triggerDeleteModalById(rowData) {
        setFormState(rowData)
        setIsOpenDeleteModal(!isOpenDeleteModal)
    }

    // modify database functions
    function addCandidateForPosting() {
        setIsWriting(true)
        writeToAPI({
            apiURL,
            method: 'POST',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchCandidatesForPostings()
            toggleAdd()
        })
    }

    function editCandidateForPosting() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.candidate_for_posting_id}`,
            method: 'PUT',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchCandidatesForPostings()
            toggleEdit()
        })
    }

    function deleteCandidateForPosting() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.candidate_for_posting_id}`,
            method: 'DELETE',
        }).then((res) => {
            setIsWriting(false)
            fetchCandidatesForPostings()
            toggleDelete()
        })
    }

    useEffect(() => {
        fetchCandidatesForPostings()
    }, [])

    return (
        <>
            <LoaderOverlay enable={isWriting} />

            {/* Modal: Add */}
            <Modal
                modalSettings={{
                    isOpen: isOpenAddModal,
                    toggle: toggleAdd,
                }}
                headerLabel="Add CandidateForPosting"
                buttonLabel="Add CandidateForPosting"
                onClick={addCandidateForPosting}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Add CandidateForPosting</legend>

                        {/* posting_id */}
                        <label htmlFor="posting_id" className="required">Posting Position: </label>
                        <select
                            name="posting_id"
                            id="posting_id"
                            value={formState?.posting_id ?? ''}
                            onChange={(e) => updateDropdown(e, setFormState)}
                            aria-required="true"
                            required
                        >
                            <option
                                value=""
                                key="posting-id-default-non-select"
                                disabled={true}
                            >
                                Select an Option
                            </option>
                            {postingsPositions.map(({
                                posting_id: postingID,
                                position,
                                employer_name: employerName,
                                employer_location: employerLocation,
                            }, index) => (
                                <option value={postingID} key={index.toString()}>
                                    {`${position}, ${employerName} (${employerLocation})`}
                                </option>
                            )
                            )}
                        </select>

                        {/* candidate_id */}
                        <label htmlFor="candidate_id" className="required">Candidate Full Name</label>
                        <select
                            name="candidate_id"
                            id="candidate_id"
                            value={formState?.candidate_id ?? ''}
                            onChange={(e) => updateDropdown(e, setFormState)}
                            aria-required="true"
                            required
                        >
                            <option
                                value=""
                                key="candidate-id-default-non-select"
                                disabled={true}
                            >
                                Select an Option
                            </option>
                            {candidatesFullNames.map(({
                                candidate_id: candidateID,
                                candidate_full_name: candidateFullName,
                            }, index) => (
                                <option value={candidateID} key={index.toString()}>
                                    {candidateFullName}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                </form>
            </Modal>

            {/* Modal: Edit */}
            <Modal
                modalSettings={{
                    isOpen: isOpenEditModal,
                    toggle: toggleEdit,
                }}
                headerLabel="Edit CandidateForPosting"
                buttonLabel="Edit CandidateForPosting"
                onClick={editCandidateForPosting}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Edit CandidateForPosting</legend>

                        {/* candidate_for_posting_id */}
                        <span>CandidateForPosting ID: {formState.candidate_for_posting_id}</span>
                        <br />

                        {/* posting_id */}
                        <label htmlFor="posting_id" className="required">Posting Position: </label>
                        <select
                            name="posting_id"
                            id="posting_id"
                            value={formState?.posting_id ?? ''}
                            onChange={(e) => updateDropdown(e, setFormState)}
                            aria-required="true"
                            required
                        >
                            <option
                                value=""
                                key="posting-id-default-non-select"
                                disabled={true}
                            >
                                Select an Option
                            </option>
                            {postingsPositions.map(({
                                posting_id: postingID,
                                position,
                                employer_name: employerName,
                                employer_location: employerLocation,
                            }, index) => (
                                <option value={postingID} key={index.toString()}>
                                    {`${position}, ${employerName} (${employerLocation})`}
                                </option>
                            )
                            )}
                        </select>

                        {/* candidate_id */}
                        <label htmlFor="candidate_id" className="required">Candidate Full Name: </label>
                        <select
                            name="candidate_id"
                            id="candidate_id"
                            value={formState?.candidate_id ?? ''}
                            onChange={(e) => updateDropdown(e, setFormState)}
                            aria-required="true"
                            required
                        >
                            <option
                                value=""
                                key="candidate-id-default-non-select"
                                disabled={true}
                            >
                                Select an Option
                            </option>
                            {candidatesFullNames.map(({
                                candidate_id: candidateID,
                                candidate_full_name: candidateFullName,
                            }, index) => (
                                <option value={candidateID} key={index.toString()}>
                                    {candidateFullName}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                </form>
            </Modal>

            {/* Modal: Delete */}
            <Modal
                modalSettings={{
                    isOpen: isOpenDeleteModal,
                    toggle: toggleDelete,
                }}
                headerLabel="Delete CandidateForPosting"
                buttonLabel="Delete CandidateForPosting"
                onClick={deleteCandidateForPosting}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Delete CandidateForPosting</legend>

                        {/* candidate_for_posting_id */}
                        <span>CandidateForPosting ID: {formState.candidate_for_posting_id}</span>
                        <br />

                        {/* posting_id */}
                        {/* Why does this work?? We never assigned posting_position to formState, we assigned posting_id? */}
                        <span>Posting Position: {formState.posting_position}</span>
                        <br />

                        {/* candidate_id */}
                        <span>Candidate Full Name: {formState.candidate_full_name}</span>
                        <br />
                    </fieldset>
                </form>
            </Modal>

            <section id="browseCandidatesForPostings">
                <h2>Browse CandidatesForPostings</h2>
                <p>The intersection table linking Candidates and Postings. See which Candidates applied for which Job Postings. <br />
                You can also create a new application, as well as edit or delete an existing application. <br /><br />
                An application will be deleted if the Posting or Candidate it is linked to is deleted.</p>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => toggleAdd()}><b>NEW</b></a>
                            </th>
                            <th className="text-center"> Delete </th>
                            <th className="text-center">candidate_for_posting_id</th>
                            <th>posting_position</th>
                            <th>candidate_full_name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidatesForPostings.map((posting, index) => (
                            <TableRow
                                data={posting} 
                                triggerEditModalById={triggerEditModalById} 
                                triggerDeleteModalById={triggerDeleteModalById} 
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
        candidate_for_posting_id: candidateForPostingID,
        posting_position: postingPosition,
        candidate_full_name: candidateFullName,
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" className="text-center" onClick={() => triggerEditModalById(data)}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" className="text-center" onClick={() => triggerDeleteModalById(data)}>Delete</a>
            </td>
            <td className="text-center">{candidateForPostingID}</td>
            <td>{postingPosition}</td>
            <td>{candidateFullName}</td>
        </tr>
    )
}
