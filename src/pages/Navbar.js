import { Link } from "react-router-dom";
// import { Dropdown} from "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from "react-bootstrap";     
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{background: `#98AFC7`}}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active fw-bold text-white" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fw-bold text-white" to="/pelanggan">Pelanggan</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fw-bold text-white" to="/mobil">Mobil</Link>
                        </li>
                        {/* <Dropdown>
                            <DropdownToggle className="text-dark bg-light" style={{border: `white`}} >
                                Sewa Mobil
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#">Add Data</DropdownItem>
                                <DropdownItem href="#">List Data</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}