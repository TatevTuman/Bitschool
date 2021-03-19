import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const NavBar = () => {
    return (<div>
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/aboutUs">About Us</NavLink>
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </Nav>
        </Navbar>
    </div>)
}

export default NavBar;