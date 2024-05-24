import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { readFromAPI } from '../helperFunctions'

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

export const CandidatesForPostings = ({ apiURL }) => {
    const [candidatesForPostings, setCandidatesForPostings] = useState([])
    const [addModalisOpen, setAddModalisOpen] = useState(false)

    function fetchCandidatesForPostings() {
        readFromAPI(apiURL).then((res) => {
            setCandidatesForPostings(res)
        })
    }

    useEffect(() => {
        fetchCandidatesForPostings()
    }, [])

    return (
        <>
            {/* Add New Candidate Modal */}
            <AddCandidateModal
                modalSettings={{
                    size: "lg",
                    backdrop: true,
                    centered: true,
                    isOpen: addModalisOpen,
                    toggle: () => setAddModalisOpen(!addModalisOpen),
                }}
                header="Add CandidateForPosting"
            >
                <form
                    action="/candidates-for-postings"
                    method="POST"
                    onsubmit="event.preventDefault()"
                >
                    <fieldset>
                        <legend>Add CandidateForPosting</legend>

                        {/* posting_id */}
                        <label htmlFor="posting_id">posting_position</label>
                        <select
                            name="posting_id"
                            id="posting_id"
                        >
                            <option value="">Select an Option</option>
                            <option value="1">Cashier</option>
                            <option value="2" selected>Florist</option>
                            <option value="3">Front Counter</option>
                            <option value="4">Deli Counter</option>
                        </select>

                        {/* candidate_id */}
                        <label htmlFor="candidate_id">candidate_full_name</label>
                        <select
                            name="candidate_id"
                            id="candidate_id"
                        >
                            <option value="">Select an Option</option>
                            <option value="1">Harry Smith</option>
                            <option value="2" selected>Patty Potter</option>
                            <option value="3">Kyle Richards</option>
                            <option value="4">Robbie Green</option>
                        </select>
                    </fieldset>
                    <input type="button" value="Cancel" onClick="browseCandidatesForPostings()" />
                    <input value="Add CandidateForPosting" type="submit" />
                </form>
            </AddCandidateModal>

            <section id="browseCandidatesForPostings">
                <h2>Browse CandidatesForPostings</h2>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => setAddModalisOpen(true)}>New</a>
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

const AddCandidateModal = (props) => {
    const { modalSettings, header, children } = props
    const { toggle } = modalSettings

    return (
        <Modal {...modalSettings}>
            <ModalHeader toggle={toggle}>{header}</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button outline color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{' '}
            </ModalFooter>
        </Modal>
    )
}
