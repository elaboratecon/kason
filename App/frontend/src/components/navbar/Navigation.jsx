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
