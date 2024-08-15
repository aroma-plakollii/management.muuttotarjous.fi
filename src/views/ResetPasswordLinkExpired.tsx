import React from "react";
import {Link} from "react-router-dom";

const ResetPasswordLinkExpired = () => {
    return (
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-body mb-3 mt-4">
                        <p className="text-center text-bold">Link has expired</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordLinkExpired;