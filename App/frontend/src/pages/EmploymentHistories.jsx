import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { readFromAPI, writeToAPI, updateDropdown, updateField, formatDate, formatDateForDateInput } from '../helperFunctions'

import { LoaderOverlay, Modal } from '../components/'

// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

export const EmploymentHistories = ({ apiURL }) => {
    const [employmentHistories, setEmploymentHistories] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [formState, setFormState] = useState({})
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    // For dropdown selection in Add/Edit
    const [employersEmployers, setEmployersEmployers] = useState([])
    const [candidatesFullNames, setCandidatesFullNames] = useState([])

    function fetchEmploymentHistories() {
        readFromAPI(apiURL).then((res) => {
            const {
                employment_histories: employmentHistories,
                employers_employers: employers_employers,
                candidates_full_names: candidates_full_names,
            } = res
            setEmploymentHistories(employmentHistories)
            setEmployersEmployers(employers_employers)
            setCandidatesFullNames(candidates_full_names)
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
    function addEmploymentHistory() {
        setIsWriting(true)
        // PREFLIGHT: Preparing data object to null-out employer_name if user changed mind and selected an existing employer_id
        if (formState.employerID !== null) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    employer_name: null
                }
            })
        }
        writeToAPI({
            apiURL,
            method: 'POST',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchEmploymentHistories()
            toggleAdd()
        })
    }

    function editEmploymentHistory() {
        setIsWriting(true)
        // PREFLIGHT: Preparing data object to null-out employer_name if user changed mind and selected an existing employer_id
        if (formState.employerID !== null) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    employer_name: null
                }
            })
        }
        writeToAPI({
            apiURL: `${apiURL}${formState.employment_history_id}`,
            method: 'PUT',
            data: formState,
        }).then((res) => {
            setIsWriting(false)
            fetchEmploymentHistories()
            toggleEdit()
        })
    }

    function deleteEmploymentHistory() {
        setIsWriting(true)
        writeToAPI({
            apiURL: `${apiURL}${formState.employment_history_id}`,
            method: 'DELETE',
        }).then((res) => {
            setIsWriting(false)
            fetchEmploymentHistories()
            toggleDelete()
        })
    }

    useEffect(() => {
        fetchEmploymentHistories()
    }, [])

    // FOR TESTING PURPOSES ONLY
    useEffect(() => {
        console.log(formState)
    }, [formState])

    return (
        <>
            <LoaderOverlay enable={isWriting} />

            {/* Modal: Add New EmploymentHistories */}
            <Modal
                modalSettings={{
                    isOpen: isOpenAddModal,
                    toggle: toggleAdd,
                }}
                headerLabel="Add EmploymentHistory"
                buttonLabel="Add EmploymentHistory"
                onClick={addEmploymentHistory}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Add Employment History</legend>

                        {/* position */}
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

                        {/* start_date */}
                        <label htmlFor="start_date" className="required">start_date</label>
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            value={formState?.start_date ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* end_date */}
                        <label htmlFor="end_date">end_date</label>
                        <input
                            type="date"
                            name="end_date"
                            id="end_date"
                            value={formState?.end_date ?? ''}
                            onChange={(e) => updateField(e, setFormState)}
                        />

                        {/* currently_employed */}
                        <label htmlFor="currently_employed" className="required">currently_employed</label>
                        <p>Are you still currently employed with this Employer?</p>
                        <select
                            name="currently_employed"
                            id="currently_employed"
                            value={formState?.currently_employed ?? ''}
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
                            {[
                                {
                                    value: 1,
                                    label: 'Yes',
                                },
                                {
                                    value: 0,
                                    label: 'No',
                                }
                            ].map(({
                                value,
                                label,
                            }, index) => (
                                <option value={value} key={index.toString()}>
                                    {label}
                                </option>
                            )
                            )}
                        </select>

                        {/* employer_id */}
                        <label htmlFor="employer_id" className="required">employer_id</label>
                        <p>First, see if you can find the Employer in the list. If you can't, select "Employer Not Listed (null)" and you will be asked to enter the Employer Name manually.</p>
                        <select
                            name="employer_id"
                            id="employer_id"
                            value={(formState.employer_id === null ? 'null' : formState.employer_id) ?? ''}
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
                            <option value="null" key="add_candidate_id_null_value">
                                {`Employer Not Listed (null)`}
                            </option>
                            {employersEmployers.map(({
                                employer_id: employerID,
                                name: employerName,
                                location: employerLocation,
                            }, index) => (
                                <option value={employerID} key={index.toString()}>
                                    {`${employerName}, (${employerLocation})`}
                                </option>
                            )
                            )}
                        </select>

                        {/* employer_name */}
                        {formState.employer_id === null && (
                            <>
                                <label htmlFor="employer_name" className="required">employer_name</label>
                                <p>Please enter the Employer Name manually.</p>
                                <input
                                    type="text"
                                    name="employer_name"
                                    id="employer_name"
                                    value={formState?.employer_name ?? ''}
                                    onChange={(e) => updateField(e, setFormState)}
                                    aria-required="true"
                                    required
                                />
                            </>
                        )}

                        {/* candidate_id */}
                        <label htmlFor="candidate_id" className="required">candidate_id</label>
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
                headerLabel="Edit EmploymentHistory"
                buttonLabel="Edit EmploymentHistory"
                onClick={editEmploymentHistory}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Edit Employment History</legend>

                        {/* employment_history_id */}
                        <span>Employment History ID: {formState.employment_history_id}</span>
                        <br />

                        {/* position */}
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

                        {/* start_date */}
                        <label htmlFor="start_date" className="required">start_date</label>
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            value={formatDateForDateInput(formState?.start_date ?? '')}
                            onChange={(e) => updateField(e, setFormState)}
                            aria-required="true"
                            required
                        />

                        {/* end_date */}
                        <label htmlFor="end_date">end_date</label>
                        <input
                            type="date"
                            name="end_date"
                            id="end_date"
                            value={formatDateForDateInput(formState?.end_date ?? '')}
                            onChange={(e) => updateField(e, setFormState)}
                        />

                        {/* currently_employed */}
                        <label htmlFor="currently_employed" className="required">currently_employed</label>
                        <p>Are you still currently employed with this Employer?</p>
                        <select
                            name="currently_employed"
                            id="currently_employed"
                            value={formState?.currently_employed ?? ''}
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
                            {[
                                {
                                    value: 1,
                                    label: 'Yes',
                                },
                                {
                                    value: 0,
                                    label: 'No',
                                }
                            ].map(({
                                value,
                                label,
                            }, index) => (
                                <option value={value} key={index.toString()}>
                                    {label}
                                </option>
                            )
                            )}
                        </select>

                        {/* employer_id */}
                        <label htmlFor="employer_id" className="required">employer_id</label>
                        <p>First, see if you can find the Employer in the list. If you can't, select "Employer Not Listed (null)" and you will be asked to enter the Employer Name manually.</p>
                        <select
                            name="employer_id"
                            id="employer_id"
                            value={(formState.employer_id === null ? 'null' : formState.employer_id) ?? ''}
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
                            <option value="null" key="add_candidate_id_null_value">
                                {`Employer Not Listed (null)`}
                            </option>
                            {employersEmployers.map(({
                                employer_id: employerID,
                                name: employerName,
                                location: employerLocation,
                            }, index) => (
                                <option value={employerID} key={index.toString()}>
                                    {`${employerName}, (${employerLocation})`}
                                </option>
                            )
                            )}
                        </select>


                        {/* employer_name */}
                        {formState.employer_id === null && (
                            <>
                                <label htmlFor="employer_name" className="required">employer_name</label>
                                <p>Please enter the Employer Name manually.</p>
                                <input
                                    type="text"
                                    name="employer_name"
                                    id="employer_name"
                                    value={formState?.employer_name ?? ''}
                                    onChange={(e) => updateField(e, setFormState)}
                                    aria-required="true"
                                    required
                                />
                            </>
                        )}


                        {/* candidate_id */}
                        <label htmlFor="candidate_id" className="required">candidate_id</label>
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
                headerLabel="Delete EmploymentHistory"
                buttonLabel="Delete EmploymentHistory"
                onClick={deleteEmploymentHistory}
            >
                <form>
                    <fieldset>
                        <legend className="visually-hidden">Delete Employment History</legend>

                        {/* employment_history_id */}
                        <span>Employment History ID: {formState.employment_history_id}</span>
                        <br />

                        {/* position */}
                        <span>Position: {formState.position}</span>
                        <br />

                        {/* start_date */}
                        <span>Start Date: {formState.start_date}</span>
                        <br />

                        {/* end_date */}
                        <span>End Date: {formState.end_date}</span>
                        <br />

                        {/* currently_employed */}
                        <span>Currently Employed?: {formState.currently_employed}</span>
                        <br />

                        {/* employer_id */}
                        <span>Employer ID: {formState.employer_id}</span>
                        <br />

                        {/* candidate_id */}
                        <span>candidate_full_name: {formState.candidate_full_name}</span>
                        <br />
                    </fieldset>
                </form>
            </Modal>

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
                                <a href="#" onClick={() => toggleAdd()}><b>NEW</b></a>
                            </th>
                            <th className="text-center">Delete</th>
                            <th className="text-center">employment_history_id</th>
                            <th>candidate_full_name</th>
                            <th>position</th>
                            <th>employer_name <br />(from database)</th>
                            <th>employer_name <br />(if not in database)</th>
                            <th>start_date</th>
                            <th>start_date</th>
                            <th>currently_employed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentHistories.map((posting, index) => (
                            <TableRow data={posting} 
                            triggerEditModalById={triggerEditModalById} 
                            triggerDeleteModalById={triggerDeleteModalById} 
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
                <a href="#" className="text-center" onClick={() => triggerEditModalById(data)}>Edit</a>
            </td>
            <td className="text-center">
                <a href="#" className="text-center" onClick={() => triggerDeleteModalById(data)}>Delete</a>
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
