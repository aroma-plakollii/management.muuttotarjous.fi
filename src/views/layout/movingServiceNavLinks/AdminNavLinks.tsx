import {NavLink} from "react-router-dom";

export const AdminNavLinks = () => {
    return (
        <>
            <li className="nav-item menu-open">
                <NavLink to={'/companies'}
                         className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-building"></i>
                    <p>
                        Companies
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/product-types'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-cube"></i>
                    <p>
                        Product Type
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/products'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-shopping-basket"></i>
                    <p>
                        Products
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/booking-request-products'}
                         className={({isActive}) => (isActive ? 'nav-link active d-flex align-items-center ' : ' d-flex align-items-center nav-link')}>
                    <i className="nav-icon fas fa-shopping-basket"></i>
                    <p>
                        Booking Request Products
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/users'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-user"></i>
                    <p>
                        Users
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/regions'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-city"></i>
                    <p>
                        Regions
                    </p>
                </NavLink>
            </li>
        </>
    )
}
