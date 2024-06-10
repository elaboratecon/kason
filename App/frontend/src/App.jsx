// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './components/navbar/Navigation'

import { Employers, Candidates, Postings, EmploymentHistories, CandidatesForPostings } from './pages/'

// Endpoints
const baseAPI = import.meta.env.VITE_API_URL

function App() {
    return (
        <>
            <Navigation
                light
                dark={false}
                full="true"
                expand="md"
                container="fluid"
            />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/employers"
                        element={<Employers apiURL={`${baseAPI}employers/`} />}
                    />
                    <Route
                        path="/candidates"
                        element={<Candidates apiURL={`${baseAPI}candidates/`} />}
                    />
                    <Route
                        path="/postings"
                        element={<Postings apiURL={`${baseAPI}postings/`} />}
                    />
                    <Route
                        path="/employment-histories"
                        element={<EmploymentHistories apiURL={`${baseAPI}employment-histories/`} />}
                    />
                    <Route
                        path="/candidates-for-postings"
                        element={<CandidatesForPostings apiURL={`${baseAPI}candidates-for-postings/`} />}
                    />
                </Routes>
            </main>
        </>
    )
}

export default App
