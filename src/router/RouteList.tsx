import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import DashboardLayout from "../views/layout/DashboardLayout";
import Login from "../views/Login";
import React from "react";
import {PrivateRoute} from "./PrivateRoute";
import {isAuthenticated} from "../services/AuthenticationService";
import ResetPassword from "../views/ResetPassword";
import ForgotPassword from "../views/ForgotPassword";
import ResetPasswordLinkExpired from "../views/ResetPasswordLinkExpired";
import {role, service} from "../services/AuthenticationService";
import {AdminRoutes} from "./movingServiceRoutes/AdminRoutes";
import {CompanyRoutes} from "./movingServiceRoutes/CompanyRoutes";
import {UnitRoutes} from "./movingServiceRoutes/UnitRoutes";
import {CompanyRoutesB} from "./movingBoxesRoutes/CompanyRoutes";
import {AdminRoutesB} from "./movingBoxesRoutes/AdminRoutes";

const RouteList = () => {

    const role = localStorage.getItem('role')
    return (
        <Routes>
            <Route path="/"  element={
                <PrivateRoute isAuthenticated={isAuthenticated()}>
                    <DashboardLayout />
                </PrivateRoute>
            }>

                {/*Moving Service*/}
                {role === 'admin' && service === 'moving-service' && (
                    AdminRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))
                )}

                {role === 'company' && service === 'moving-service' && (
                    CompanyRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))
                )}

                {role === 'unit' && service === 'moving-service' && (
                    UnitRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))
                )}

                {/*Moving Boxes*/}
                {role === 'admin' && service === 'boxes-service' && (
                    AdminRoutesB.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))
                )}

                {role === 'company' && service === 'boxes-service' && (
                    CompanyRoutesB.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))
                )}

            </Route>

            <Route path="/login" element={
                isAuthenticated() ?
                    (role === 'admin' || role === 'company') ? <Navigate to="/companies" replace={true} /> :
                        role === 'unit' ? <Navigate to="/" replace={true} /> :
                            <Login />
                    : <Login />
            }/>
            {/* Forgot Password */}
            <Route path="/forgot-password"  element={<ForgotPassword />}/>
            {/* Forgot Password */}
            <Route path="/reset-password/:token"  element={<ResetPassword />}/>
            {/* Reset Password Link Expired*/}
            <Route path="/reset-password/expired"  element={<ResetPasswordLinkExpired />}/>
        </Routes>
    )
}

export default RouteList;