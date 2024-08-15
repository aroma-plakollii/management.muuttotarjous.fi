import CompaniesList from "../../components/movingServiceComponents/adminComponents/companies/CompaniesList";
import EditCompany from "../../components/movingServiceComponents/adminComponents/companies/EditCompany";
import CreateCompany from "../../components/movingServiceComponents/adminComponents/companies/CreateCompany";
import ProductList from "../../components/movingServiceComponents/adminComponents/products/ProductList";
import EditProduct from "../../components/movingServiceComponents/adminComponents/products/EditProduct";
import CreateProduct from "../../components/movingServiceComponents/adminComponents/products/CreateProduct";
import UsersList from "../../components/movingServiceComponents/adminComponents/users/UsersList";
import EditUser from "../../components/movingServiceComponents/adminComponents/users/EditUser";
import CreateUser from "../../components/movingServiceComponents/adminComponents/users/CreateUser";
import BookingRequestProductList from "../../components/movingServiceComponents/adminComponents/bookingRequestProducts/BookingRequestProductList";
import CreateBookingRequestProduct from "../../components/movingServiceComponents/adminComponents/bookingRequestProducts/CreateBookingRequestProduct";
import EditBookingRequestProduct from "../../components/movingServiceComponents/adminComponents/bookingRequestProducts/EditBookingRequestProduct";
import React from "react";
import ProductTypeList from "../../components/movingServiceComponents/adminComponents/productTypes/ProductTypeList";
import EditProductType from "../../components/movingServiceComponents/adminComponents/productTypes/EditProductType";
import CreateProductType from "../../components/movingServiceComponents/adminComponents/productTypes/CreateProductType";
import RegionList from "../../components/movingServiceComponents/adminComponents/regions/RegionList";
import CreateRegion from "../../components/movingServiceComponents/adminComponents/regions/CreateRegion";
import EditRegion from "../../components/movingServiceComponents/adminComponents/regions/EditRegion";

export const AdminRoutes = [
    // Companies
    { path: "/companies", element: <CompaniesList /> },
    { path: "/companies/:id", element: <EditCompany /> },
    { path: "/companies/create", element: <CreateCompany /> },

    // Products
    { path: "/products", element: <ProductList /> },
    { path: "/product/:id", element: <EditProduct /> },
    { path: "/product/create", element: <CreateProduct /> },

    // Product Types
    { path: "/product-types", element: <ProductTypeList /> },
    { path: "/product-type/:id", element: <EditProductType /> },
    { path: "/product-type/create", element: <CreateProductType /> },

    // Users
    { path: "/users", element: <UsersList /> },
    { path: "/users/:id", element: <EditUser /> },
    { path: "/users/create", element: <CreateUser /> },

    // Booking Request Products
    { path: "/booking-request-products", element: <BookingRequestProductList /> },
    { path: "/booking-request-products/create", element: <CreateBookingRequestProduct /> },
    { path: "/booking-request-products/:id", element: <EditBookingRequestProduct /> },

    // Coupons
    { path: "/regions", element: <RegionList /> },
    { path: "/regions/create", element: <CreateRegion /> },
    { path: "/regions/:id", element: <EditRegion /> },
];