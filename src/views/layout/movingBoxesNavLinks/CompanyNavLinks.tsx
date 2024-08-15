import {NavLink} from "react-router-dom";
export const CompanyNavLinksB = () => {
    return (
        <>
            <li className="nav-item menu-open">
                <NavLink to={'/companies'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-building"></i>
                    <p>
                        Company
                    </p>
                </NavLink>
            </li>
            <li className="nav-item menu-open">
                <NavLink to={'/day'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-file"></i>
                    <p>
                        Day List
                    </p>
                </NavLink>
            </li>
            <li className="nav-item menu-open">
                <NavLink to={'/month'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-file"></i>
                    <p>
                        Month List
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/prices'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-tag"></i>
                    <p>
                        Prices
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/blocked-dates'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-calendar"></i>
                    <p>
                        Blocked Dates
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/cities'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-city"></i>
                    <p>
                        Cities
                    </p>
                </NavLink>
            </li>
        </>
    )
}