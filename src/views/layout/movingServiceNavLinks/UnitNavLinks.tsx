import {NavLink} from "react-router-dom";

export const UnitNavLinks = () => {
    return (
        <>
            <li className="nav-item menu-open">
                <NavLink to={'/day'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-calendar-check"></i>
                    <p>
                        Day List
                    </p>
                </NavLink>
                <NavLink to={'/month'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-calendar-check"></i>
                    <p>
                        Month List
                    </p>
                </NavLink>
            </li>
        </>
    )
}