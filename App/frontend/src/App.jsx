import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PeoplePage from './pages/PeoplePage'
import Navbar from './components/navbar/NavBar'

import { Employers, Candidates, Postings, EmploymentHistories, CandidatesForPostings } from './pages/'

// Endpoints
const baseAPI = import.meta.env.VITE_API_URL

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/people/*"
                        element={<PeoplePage />}
                        />
                    <Route
                        path="/employers"
                        element={<Employers apiURL={`${baseAPI}employers`} />}
                    />
                    <Route
                        path="/candidates"
                        element={<Candidates apiURL={`${baseAPI}candidates`} />}
                    />
                    <Route
                        path="/postings"
                        element={<Postings apiURL={`${baseAPI}postings`} />}
                    />
                    <Route
                        path="/employment-histories"
                        element={<EmploymentHistories apiURL={`${baseAPI}employment-histories`} />}
                    />
                    <Route
                        path="/candidates-for-postings"
                        element={<CandidatesForPostings apiURL={`${baseAPI}candidates-for-postings`} />}
                    />
                </Routes>
            </main>
        </>
    )
}

export default App
