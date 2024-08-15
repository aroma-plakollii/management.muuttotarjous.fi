import MonthList from "../../components/movingServiceComponents/unitComponents/bookings/MonthList";
import EditBooking from "../../components/movingServiceComponents/unitComponents/bookings/EditBooking";
import DayList from "../../components/movingServiceComponents/unitComponents/bookings/DayList";


export const UnitRoutes = [

    // Bookings
    { path: "/month", element: <MonthList /> },
    { path: "/booking/:id", element: <EditBooking /> },
    { path: "/day", element: <DayList /> },
];