import CompanyDetails from "../../components/movingServiceComponents/companyComponents/companies/CompanyDetails";
import EditCompany from "../../components/movingServiceComponents/companyComponents/companies/EditCompany";
import ProductList from "../../components/movingServiceComponents/companyComponents/products/ProductList";
import EditProduct from "../../components/movingServiceComponents/companyComponents/products/EditProduct";
import UnitList from "../../components/movingServiceComponents/companyComponents/units/UnitList";
import EditUnit from "../../components/movingServiceComponents/companyComponents/units/EditUnit";
import CreateUnit from "../../components/movingServiceComponents/companyComponents/units/CreateUnit";
import CustomPriceList from "../../components/movingServiceComponents/companyComponents/customPrices/CustomPriceList";
import EditCustomPrice from "../../components/movingServiceComponents/companyComponents/customPrices/EditCustomPrice";
import CreateCustomPrice from "../../components/movingServiceComponents/companyComponents/customPrices/CreateCustomPrice";
import FreeCityList from "../../components/movingServiceComponents/companyComponents/freeCities/FreeCityList";
import EditFreeCity from "../../components/movingServiceComponents/companyComponents/freeCities/EditFreeCity";
import CreateFreeCity from "../../components/movingServiceComponents/companyComponents/freeCities/CreateFreeCity";
import UnitAvailabilityList from "../../components/movingServiceComponents/companyComponents/unitAvailability/UnitAvailabilityList";
import EditUnitAvailability from "../../components/movingServiceComponents/companyComponents/unitAvailability/EditUnitAvailability";
import CreateUnitAvailability from "../../components/movingServiceComponents/companyComponents/unitAvailability/CreateUnitAvailability";
import CreatePrice from "../../components/movingServiceComponents/companyComponents/prices/CreatePrice";
import EditPrice from "../../components/movingServiceComponents/companyComponents/prices/EditPrice";
import MonthList from "../../components/movingServiceComponents/companyComponents/bookings/MonthList";
import EditBooking from "../../components/movingServiceComponents/companyComponents/bookings/EditBooking";
import AddExtraService from "../../components/movingServiceComponents/companyComponents/bookings/AddExtraService";
import AddAJob from "../../components/movingServiceComponents/companyComponents/bookings/AddAJob";
import AddABlock from "../../components/movingServiceComponents/companyComponents/bookings/AddABlock";
import BookingRequestMonthList from "../../components/movingServiceComponents/companyComponents/bookingRequests/BookingRequestMonthList";
import EditBookingRequest from "../../components/movingServiceComponents/companyComponents/bookingRequests/EditBookingRequest";
import CouponList from "../../components/movingServiceComponents/companyComponents/coupons/CouponList";
import CreateCoupon from "../../components/movingServiceComponents/companyComponents/coupons/CreateCoupon";
import EditCoupon from "../../components/movingServiceComponents/companyComponents/coupons/EditCoupon";

export const CompanyRoutes = [
    // Companies
    { path: "/companies", element: <CompanyDetails /> },
    { path: "/companies/:id", element: <EditCompany /> },

    // Products
    { path: "/products", element: <ProductList /> },
    { path: "/unit/products/:id", element: <ProductList /> },
    { path: "/product/:id", element: <EditProduct /> },

    // Units
    { path: "/units", element: <UnitList /> },
    { path: "/unit/:id", element: <EditUnit /> },
    { path: "/unit/create", element: <CreateUnit /> },

    // Custom Prices
    { path: "/custom-prices", element: <CustomPriceList /> },
    { path: "/custom-prices/:id", element: <EditCustomPrice /> },
    { path: "/custom-prices/create", element: <CreateCustomPrice /> },

    // Free Cities
    { path: "/free-cities", element: <FreeCityList /> },
    { path: "/free-cities/:id", element: <EditFreeCity /> },
    { path: "/free-cities/create", element: <CreateFreeCity /> },

    // Unit Availability
    { path: "/units-availability", element: <UnitAvailabilityList /> },
    { path: "/units-availability/:id", element: <EditUnitAvailability /> },
    { path: "/units-availability/create", element: <CreateUnitAvailability /> },

    // Product Price Details
    { path: "/price/create/unit/:unitId/product/:productId", element: <CreatePrice /> },
    { path: "/price/unit/:unitId/product/:productId", element: <EditPrice /> },

    // Bookings
    { path: "/month", element: <MonthList /> },
    { path: "/booking/:id", element: <EditBooking /> },
    { path: "/booking/extra-service/:id", element: <AddExtraService /> },
    { path: "/booking/add-a-job", element: <AddAJob /> },
    { path: "/booking/add-a-block", element: <AddABlock /> },

    // Booking Requests
    { path: "/booking-request-month", element: <BookingRequestMonthList /> },
    { path: "/booking-request/:id", element: <EditBookingRequest /> },

    // Coupons
    { path: "/coupons", element: <CouponList /> },
    { path: "/coupons/create", element: <CreateCoupon /> },
    { path: "/coupons/:id", element: <EditCoupon /> },
];