import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const NavBar = () => {

    const navItems = [

        {
            to: "/",
            value: "Home",
        },
        {
            to: "/aboutUs",
            value: "About Us",
        },
        {
            to: "/contact",
            value: "Contact",
        },
    ]
    const navItem = navItems.map((item,index) => {
            return (
                <NavLink key={index} className="nav-link" to={item.to}>{item.value}</NavLink>
            )
        }
    );

    return (<div>
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                {navItem}
            </Nav>
        </Navbar>
    </div>)
}

export default NavBar;