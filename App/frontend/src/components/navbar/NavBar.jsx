import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

const Navbar = () => {
    return (
        <>
            <header>
                <h1>KASON: Get a Job!™</h1>
            </header>
            <nav>
                <Link to="/">Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to="/employers">Employers</Link>&nbsp;&nbsp;|&nbsp;
                <Link to="/candidates">Candidates</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to="/postings">Postings</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to="/employment-histories">EmploymentHistories</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to="/candidates-for-postings">CandidatesForPostings</Link>
            </nav>
        </>
    );
};

export default Navbar;
