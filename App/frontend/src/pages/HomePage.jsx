import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <section className="text-start">
            <h2>Matching candidates to their next job since 2024!</h2>
            <p>Click a table to view and edit the current data.</p>
            <br />
            <ul>
                <li>
                    <h4><Link to="/employers">Employers</Link></h4>
                    <p>Browse Employers in the database, create new ones, and edit existing ones.</p>
                </li>
                <li>
                    <h4><Link to="/candidates">Candidates</Link></h4>
                    <p>Browse Candidates, create new ones, and edit existing ones.</p>
                </li>
                <li>
                    <h4><Link to="/postings">Postings</Link></h4>
                    <p>Browse Job Postings, create new ones, and edit existing ones. Each Posting must be linked to an Employer in our database - keep in mind deleting an Employer will delete all of their Postings.</p>
                </li>
                <li>
                    <h4><Link to="/employment-histories">EmploymentHistories</Link></h4>
                    <p>Browse Employement Histories. See which Candidate worked at which Employer, when they began and ended their position—or whether they're still in that role. Employers can be from our database, or entered manually with a null foreign key.</p>
                    <p>You can create new Employment History items, as well as edit or delete existing ones. Each Employment History must be linked to a candidate - keep in mind deleting that candidate will delete it.</p>
                </li>
                <li>
                    <h4><Link to="/candidates-for-postings">CandidatesForPostings</Link></h4>
                    <p>The intersection table linking Candidates and Postings. See which Candidates applied for which Job Postings. You can also create a new application, as well as edit or delete an existing application. An application will be deleted if the Posting or Candidate it is linked to is deleted.</p>
                </li>
            </ul>
        </section>
    )
}

export default HomePage
