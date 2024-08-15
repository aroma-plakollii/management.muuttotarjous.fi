import DayList from "../../components/movingBoxesComponents/adminComponents/bookings/DayList";
import MonthList from "../../components/movingBoxesComponents/adminComponents/bookings/MonthList";
import EditBooking from "../../components/movingBoxesComponents/adminComponents/bookings/EditBooking";
import CreateBooking from "../../components/movingBoxesComponents/adminComponents/bookings/CreateBooking";
import CompaniesList from "../../components/movingBoxesComponents/adminComponents/companies/CompaniesList";
import EditCompany from "../../components/movingBoxesComponents/adminComponents/companies/EditCompany";
import CreateCompany from "../../components/movingBoxesComponents/adminComponents/companies/CreateCompany";
import PricesList from "../../components/movingBoxesComponents/adminComponents/price/PricesList";
import EditPrice from "../../components/movingBoxesComponents/adminComponents/price/EditPrice";
import CreatePrice from "../../components/movingBoxesComponents/adminComponents/price/CreatePrice";
import CitiesList from "../../components/movingBoxesComponents/adminComponents/cities/CitiesList";
import EditCity from "../../components/movingBoxesComponents/adminComponents/cities/EditCity";
import CreateCity from "../../components/movingBoxesComponents/adminComponents/cities/CreateCity";
import BlockedDatesList from "../../components/movingBoxesComponents/adminComponents/BlockedDates/BlockedDatesList";
import EditBlockedDates from "../../components/movingBoxesComponents/adminComponents/BlockedDates/EditBlockedDates";
import CreateBlockedDates from "../../components/movingBoxesComponents/adminComponents/BlockedDates/CreateBlockedDates";
import UsersList from "../../components/movingBoxesComponents/adminComponents/users/UsersList";
import EditUser from "../../components/movingBoxesComponents/adminComponents/users/EditUser";
import CreateUser from "../../components/movingBoxesComponents/adminComponents/users/CreateUser";

export const AdminRoutesB = [
    // Bookings
    { path:"/day", element: <DayList />},
    { path:"/month" , element: <MonthList />},
    { path:"/bookings/:id", element:<EditBooking />},
    { path:"/bookings/create", element:<CreateBooking />},

    // Companies
    { path:"/companies",  element: <CompaniesList />},
    { path:"/companies/:id", element: <EditCompany />},
    { path:"/companies/create", element: <CreateCompany /> },

    // // Prices
    // { path:"/prices",  element:<PricesList /> },
    // { path:"/prices/:id",  element:<EditPrice /> },
    // { path:"/prices/create",  element:<CreatePrice /> },
    //
    // // Free Cities
    // { path:"/cities",  element: <CitiesList /> },
    // { path:"/cities/:id",  element: <EditCity /> },
    // { path:"/cities/create",  element: <CreateCity /> },
    //
    // // Blocked Dates
    // { path:"/blocked-dates", element:<BlockedDatesList /> },
    // { path:"/blocked-dates/:id", element:<EditBlockedDates /> },
    // { path:"/blocked-dates/create", element:<CreateBlockedDates /> },

    // Users
    { path: "/users", element: <UsersList /> },
    { path: "/users/:id", element: <EditUser /> },
    { path: "/users/create", element: <CreateUser /> },
];