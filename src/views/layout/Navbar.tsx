import {logout} from "../../services/AuthenticationService";
import {useState} from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    // let user: any = sessionStorage.getItem("user");
    let user: any = localStorage.getItem("user");
    let userObject = JSON.parse(user);

    const [state, setState] = useState({
        user: userObject
    });

    const onLogout = async () => {
        let res = await logout();

        if (res){
            // sessionStorage.removeItem('token');
            localStorage.removeItem('token');
            window.location.reload();
        }
    }
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                        className="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="javascript:void(0)">
                        <span>{state.user.name}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0)" className="dropdown-item" onClick={onLogout}>
                            <span className="text-muted text-md">Logout</span> <i className="fas fa-user-alt float-right"></i>
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;