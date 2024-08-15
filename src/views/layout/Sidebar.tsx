import {NavLink} from "react-router-dom";
import { role, service } from '../../services/AuthenticationService'
import {CompanyNavLinks} from "./movingServiceNavLinks/CompanyNavLinks";
import {AdminNavLinks} from "./movingServiceNavLinks/AdminNavLinks";
import {AdminNavLinksB} from "./movingBoxesNavLinks/AdminNavLinks";
import {UnitNavLinks} from "./movingServiceNavLinks/UnitNavLinks";
import {CompanyNavLinksB} from "./movingBoxesNavLinks/CompanyNavLinks";

const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="javascript:void(0)" className="brand-link text-center">
                {role === 'admin' && service === 'moving-service' && <span className="brand-text font-weight-light">Management Dashboard</span>}
                {role === 'company' && service === 'moving-service' && <span className="brand-text font-weight-light">Company Dashboard</span>}
                {role === "unit" && service === 'moving-service' && <span className="brand-text font-weight-light">Unit Dashboard</span>}

                {role === 'admin' && service === 'boxes-service' && <span className="brand-text font-weight-light">Suomenmuuttolaatikko</span>}
                {role === 'company' && service === 'boxes-service' && <span className="brand-text font-weight-light">Moving Boxes Dashboard</span>}
            </a>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column p-2" data-widget="treeview" role="menu"
                        data-accordion="false">

                        {/*Moving Service*/}
                        {role === 'admin' && service === 'moving-service' && <AdminNavLinks />}
                        {role === "company" && service === 'moving-service' && <CompanyNavLinks />}
                        {role === "unit" && service === 'moving-service' &&<UnitNavLinks />}

                        {/*Moving Boxes*/}
                        {role === 'admin' && service === 'boxes-service' && <AdminNavLinksB />}
                        {role === "company" && service === 'boxes-service' && <CompanyNavLinksB />}

                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;