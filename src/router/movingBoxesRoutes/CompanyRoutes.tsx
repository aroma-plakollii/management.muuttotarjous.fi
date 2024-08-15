import DayList from "../../components/movingBoxesComponents/companyComponents/bookings/DayList";
import React from "react";
import MonthList from "../../components/movingBoxesComponents/companyComponents/bookings/MonthList";
import BlockedDatesList from "../../components/movingBoxesComponents/companyComponents/BlockedDates/BlockedDatesList";
import EditBlockedDates from "../../components/movingBoxesComponents/companyComponents/BlockedDates/EditBlockedDates";
import CreateBlockedDates from "../../components/movingBoxesComponents/companyComponents/BlockedDates/CreateBlockedDates";
import EditBooking from "../../components/movingBoxesComponents/companyComponents/bookings/EditBooking";
import CreateBooking from "../../components/movingBoxesComponents/companyComponents/bookings/CreateBooking";
import CompaniesList from "../../components/movingBoxesComponents/companyComponents/companies/CompaniesList";
import EditCompany from "../../components/movingBoxesComponents/companyComponents/companies/EditCompany";
import PricesList from "../../components/movingBoxesComponents/companyComponents/price/PricesList";
import EditPrice from "../../components/movingBoxesComponents/companyComponents/price/EditPrice";
import CreatePrice from "../../components/movingBoxesComponents/companyComponents/price/CreatePrice";
import CitiesList from "../../components/movingBoxesComponents/companyComponents/cities/CitiesList";
import EditCity from "../../components/movingBoxesComponents/companyComponents/cities/EditCity";
import CreateCity from "../../components/movingBoxesComponents/companyComponents/cities/CreateCity";

export const CompanyRoutesB = [
    // Companies
    { path:"/companies",  element: <CompaniesList />},
    { path:"/companies/:id", element: <EditCompany />},

    // Bookings
    { path: "/day", element: <DayList /> },
    { path: "/month", element: <MonthList /> },
    { path: "/bookings/:id", element: <EditBooking /> },
    { path: "/bookings/create", element: <CreateBooking /> },

    // Blocked Dates
    { path: "/blocked-dates", element: <BlockedDatesList /> },
    { path: "/blocked-dates/:id", element: <EditBlockedDates /> },
    { path: "/blocked-dates/create", element: <CreateBlockedDates /> },

    // Prices
    { path:"/prices",  element:<PricesList /> },
    { path:"/prices/:id",  element:<EditPrice /> },
    { path:"/prices/create",  element:<CreatePrice /> },

    // Free Cities
    { path:"/cities",  element: <CitiesList /> },
    { path:"/cities/:id",  element: <EditCity /> },
    { path:"/cities/create",  element: <CreateCity /> },
];