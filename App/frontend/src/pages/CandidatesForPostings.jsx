import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateField } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

export const CandidatesForPostings = ({ apiURL }) => {
    const [candidatesForPostings, setCandidatesForPostings] = useState([])
    const [postingsPositions, setPostingsPositions] = useState([])
    const [candidatesFullNames, setCandidatesFullNames] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [formState, setFormState] = useState({})
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

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


    useEffect(() => {
        fetchCandidatesForPostings()
    }, [])

    // FOR TESTING PURPOSES ONLY
    useEffect(() => {
        console.log(formState)
    }, [formState])

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
                <form onSubmit={(e) => e.preventDefault()}>
                    <fieldset>
                        <legend className="visually-hidden">Add CandidateForPosting</legend>

                        {/* posting_id */}
                        <label htmlFor="posting_id" className="required">posting_position</label>
                        <select
                            name="posting_id"
                            id="posting_id"
                            value={formState?.posting_id ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
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
                        <label htmlFor="candidate_id" className="required">candidate_full_name</label>
                        <select
                            name="candidate_id"
                            id="candidate_id"
                            value={formState?.candidate_id ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
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

            <section id="browseCandidatesForPostings">
                <h2>Browse CandidatesForPostings</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => toggleAdd()}>New</a>
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
