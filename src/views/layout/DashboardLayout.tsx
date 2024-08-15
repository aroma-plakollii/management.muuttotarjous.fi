import RouteList from "../../router/RouteList";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import ControlSidebar from "./ControlSidebar";
import Footer from "./Footer";

const DashboardLayout = () => {
    return (
        <div className={'hold-transition sidebar-mini'}>
            <div className={'wrapper'}>
                <Navbar />
                <Sidebar />
                <Content />
                <ControlSidebar />
                <Footer />
            </div>
        </div>
    )
}

export default DashboardLayout;