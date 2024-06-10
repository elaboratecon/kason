// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

// Code based on Oregon State CS340 React Starter App accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

import { useState } from 'react'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from 'reactstrap'

const Navigation = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <header>
                <h1>KASON: Get a Job!™</h1>
            </header>
            <div>
                <Navbar {...args} style={{ padding: '.25rem' }}>
                    <NavbarBrand></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mx-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/employers">Employers</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/candidates">Candidates</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/postings">Postings</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/employment-histories">EmploymentHistories</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/candidates-for-postings">CandidatesForPostings</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText></NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Navigation
