import {Link, useNavigate, useParams} from "react-router-dom";
import { resetPassword } from "../services/AuthenticationService";
import { getUsers } from "../services/movingServiceServices/adminServices/UserService";
import {useState} from "react";

const ResetPassword = () => {

    const [state, setState] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState(false)
    const [tokeIsExpired, setTokenIsExpired] =useState(false)

    const { token } = useParams();
    let navigate = useNavigate();

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, ...state,
            [key]: value
        })   
    }

    const onResetPassword = async () => {
        setError(false)

        if (
            !state.email ||
            !state.password ||
            !state.password_confirmation ||
            state.password !== state.password_confirmation
        ){
            setError(true)

            return;
        }

        // const users = await getUsers();
        // const user = users.some((user: any) => user.email === state.email);
        //
        // if (!user) {
        //     setError(false)
        //
        //     return;
        // }

        if (!error){
            const res = await resetPassword(state,token);

            if (res.message === 'Password reset successful') {
                navigate('/login');
            } else if (res.message === 'Token has expired') {
                setTokenIsExpired(true)
            }
        }
    };

    return(
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="javascript:void(0)" className="h1"><b>Reset</b>Password</a>
                    </div>
                    <div className="card-body mb-3 mt-3">
                        <div>
                            <div className="input-group mb-3">
                                <input type="text" className={`form-control ${error && !state.email ? 'is-invalid' : ''}`} id="email"
                                       placeholder="Email" onChange={(val: any) => onInputChange('email', val)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className={`form-control ${error && !state.password ? 'is-invalid' : ''}`} id="password"
                                       placeholder="New Password" onChange={(val: any) => onInputChange('password', val)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className={`form-control ${error && !state.password_confirmation ? 'is-invalid' : ''}`} id="password_confirmation"
                                       placeholder="Confirm Password" onChange={(val: any) => onInputChange('password_confirmation', val)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {tokeIsExpired && <p className={'text-danger'}>Reset token expired, please send another reset link</p>}
                                    <button type="submit" className="btn btn-primary btn-block" onClick={onResetPassword}>
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;
