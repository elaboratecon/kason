// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateField, updateDropdown } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'


export const Postings = ({ apiURL }) => {
    // state
    const [postings, setPostings] = useState([])
    const [employers, setEmployers] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [formState, setFormState] = useState({})
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    // fetch data function
    function fetchPostings() {
        readFromAPI(apiURL).then((res) => {
            const { postings, employers } = res
            setPostings(postings)
            setEmployers(employers)
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
    function addPosting() {
        setIsWriting(true)
        writeToAPI({
            apiURL,
            method: 'POST',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchPostings()
            toggleAdd()
        })
    }

    function editPosting() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.posting_id}`,
            method: 'PUT',
            data: formState
        }).then((res) => {
            setIsWriting(false)
            fetchPostings()
            toggleEdit()
        })
    }

    function deletePosting(){
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.posting_id}`,
            method: 'DELETE'
        }).then((res) => {
            setIsWriting(false)
            fetchPostings()
            toggleDelete()
        })
    }

    // trigger modal functions
    function triggerEditModalById(rowData) {
        setFormState(rowData)
        setIsOpenEditModal(!isOpenEditModal)
    }

    function triggerDeleteModalById(rowData) {
        const {
            posting_id: postingID,
            position,
            description,
            employer_name: employerName,
        } = rowData

        setFormState({
            posting_id: postingID,
            position,
            description,
            employer_name: employerName,
        })
        setIsOpenDeleteModal(!isOpenDeleteModal)
    }

    // on page load
    useEffect(() => {
        fetchPostings()
    }, [])

    // FOR TESTING PURPOSES ONLY
    useEffect(() => {
        console.log(formState)
    }, [formState])

    return (
        <>
            <LoaderOverlay enable={isWriting} />

            {/* MODAL: Add New Posting */}
            <Modal
                modalSettings={{
                    isOpen: isOpenAddModal,
                    toggle: toggleAdd,
                }}
                headerLabel="Add Posting"
                buttonLabel="Add Posting"
                onClick={addPosting}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Add Posting</legend>

                        {/* <position */}
                        <label htmlFor="position" className="required">position</label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={formState?.position ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* employer_id */}
                        <label htmlFor="employer_id" className="required">employer_id</label>
                        <select
                            name="employer_id"
                            id="employer_id"
                            value={formState?.employer_id ?? ''}
                            onChange={(e) => updateDropdown(e, setFormState)}
                            aria-required="true"
                            required
                        >
                            <option
                                value=""
                                key="employer-id-default-non-select"
                                disabled={true}
                            >
                                Select an Option
                            </option>
                            {employers.map(({
                                employer_id: employerID,
                                name: name,
                                location,
                            }, index) => (
                                <option value={employerID} key={index.toString()}>
                                    {`${name} (${location})`}
                                </option>
                            )
                            )}
                        </select>

                        {/* description */}
                        <label htmlFor="description" className="required">description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={formState?.description ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />
                    </fieldset>
                </form>
            </Modal>

            {/* MODAL: Edit Existing Posting */}
            <Modal
                modalSettings={{
                    isOpen: isOpenEditModal,
                    toggle: toggleEdit,
                }}
                headerLabel="Edit Posting"
                buttonLabel="Edit Posting"
                onClick={editPosting}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Edit Posting</legend>

                        {/* posting_id */}
                        <span><b>Posting ID: </b>{formState.posting_id}</span>
                        <br />
                        <br />

                        {/* <position */}
                        <label htmlFor="position" className="required"><b>Position</b></label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={formState?.position ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* employer_id */}
                        <label htmlFor="employer_id" className="required"><b>Employer</b></label>
                        <select
                            name="employer_id"
                            id="employer_id"
                            value={formState?.employer_id ?? ''}
                            onChange={(e) => updateDropdown(e, setFormState)}
                            aria-required="true"
                            required
                        >
                            <option
                                value=""
                                key="employer-id-default-non-select"
                                disabled={true}
                            >
                                Select an Option
                            </option>
                            {employers.map(({
                                employer_id: employerID,
                                name: name,
                                location,
                            }, index) => (
                                <option value={employerID} key={index.toString()}>
                                    {`${name} (${location})`}
                                </option>
                            )
                            )}
                        </select>

                        {/* description */}
                        <label htmlFor="description" className="required"><b>Description</b></label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={formState?.description ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />
                    </fieldset>
                </form>
            </Modal>

            {/* MODAL: Delete Existing Posting */}
            <Modal
                modalSettings={{
                    isOpen: isOpenDeleteModal,
                    toggle: toggleDelete,
                }}
                headerLabel="Delete Posting"
                buttonLabel="Delete Posting"
                onClick={deletePosting}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Delete Posting</legend>
                        <span><b>Posting ID: </b>{formState.posting_id}</span>
                        <br />
                        <span><b>Position: </b>{formState.position}</span>
                        <br />
                        <span><b>Description: </b>{formState?.description ?? ''}</span>
                        <br />
                        <span><b>Employer: </b>{formState?.employer_name ?? ''}</span>
                        <br />
                    </fieldset>
                </form>
            </Modal>

            <section id="browsePostings">
                <h2>Browse Postings</h2>
                <p>Browse Job Postings, create new ones, and edit existing ones. Each Posting must be linked to an Employer <br />in our database - keep in mind deleting an Employer will delete all of their Postings.</p>
                <table className="table table-light table-bordered table-hover">
                    <thead className="table-secondary">
                        <tr>
                            <th className="text-center">
                                <a href="#" onClick={() => setIsOpenAddModal(true)}><b>NEW</b></a>
                            </th>
                            <th className="text-center">Delete</th>
                            <th className="text-center">posting_id</th>
                            <th>position</th>
                            <th>employer_name</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postings.map((posting, index) => (
                            <TableRow data={posting} 
                            triggerEditModalById= {triggerEditModalById} 
                            triggerDeleteModalById= {triggerDeleteModalById} 
                            key={index.toString()} />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const TableRow = ({ data, triggerEditModalById, triggerDeleteModalById }) => {
    const {
        posting_id: postingID,
        position,
        description,
        employer_name: employerName,
    } = data

    return (
        <tr>
            <td className="text-center">
                <a href="#" onClick={() => triggerEditModalById(data)}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" onClick={() => triggerDeleteModalById(data)}>Delete</a>
            </td>
            <td className="text-center">{postingID}</td>
            <td>{position}</td>
            <td>{employerName}</td>
            <td>{description === null ? 'NULL' : description}</td>
        </tr>
    )
}