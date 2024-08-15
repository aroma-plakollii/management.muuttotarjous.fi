import {NavLink} from "react-router-dom";

export const CompanyNavLinks = () => {

    return (
        <>
            <li><p className="mx-2 text-light">PROFILE</p></li>

            <li className="nav-item menu-open">
                <NavLink to={'/companies'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-building"></i>
                    <p>
                        Company
                    </p>
                </NavLink>
            </li>

            <li><p className="mx-2 mt-3 text-light">OPTIONS</p></li>

            {/*<li className="nav-item menu-open">*/}
            {/*    <NavLink to={'/products'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>*/}
            {/*        <i className="nav-icon fas fa-shopping-basket"></i>*/}
            {/*        <p>*/}
            {/*            Products*/}
            {/*        </p>*/}
            {/*    </NavLink>*/}
            {/*</li>*/}

            <li className="nav-item menu-open">
                <NavLink to={'/units'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-truck-moving"></i>
                    <p>
                        Units
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/month'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-calendar-check"></i>
                    <p>
                        Month List
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/booking-request-month'}
                         className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-calendar-check"></i>
                    <p>
                        Request List
                    </p>
                </NavLink>
            </li>

            <li><p className="mx-2 mt-3 text-light">CUSTOM OPTIONS</p></li>

            <li className="nav-item menu-open">
                <NavLink to={'/custom-prices'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-calendar"></i>
                    <p>
                        Price By Date
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/units-availability'}
                         className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-stopwatch"></i>
                    <p>
                        Blocked Units By Date
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/free-cities'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-city"></i>
                    <p>
                        Free Transport Cities
                    </p>
                </NavLink>
            </li>

            <li className="nav-item menu-open">
                <NavLink to={'/coupons'} className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <i className="nav-icon fas fa-tag"></i>
                    <p>
                        Coupons
                    </p>
                </NavLink>
            </li>
        </>
    )
}