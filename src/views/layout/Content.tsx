import {Outlet} from "react-router-dom";

const Content = () => {
    return (
        <div className="content-wrapper">
            <Outlet />
        </div>
    )
}

export default Content;