import {useState} from "react";
import {login} from "../services/AuthenticationService";
import {getCompanyByUser} from "../services/movingServiceServices/adminServices/CompaniesService";
import {Link} from "react-router-dom";

const Login = () => {
    const [state, setState] = useState({email: '', password: '', hasError: false, loginCreds: false});

    const onLogin = async () => {
        setState({...state, hasError: false, loginCreds: false});

        if (
            !state.email ||
            !state.password
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await login({
                email: state.email,
                password: state.password
            });

            if (res.code === 'ERR_BAD_REQUEST'){
                setState({
                    ...state,
                    hasError: true,
                    loginCreds: true
                })

                return;
            }

            if (res.token){

                localStorage.setItem('service', res.service)
                localStorage.setItem('token', res.token)
                localStorage.setItem('user', JSON.stringify(res.user))
                localStorage.setItem('role', res.role)

                localStorage.setItem('ms_company', res.ms_company_id);
                localStorage.setItem('mb_company', res.mb_company_id);
                res.token && window.location.reload();
            }
        }
    }

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            [key]: value
        })
    }

    return (
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="javascript:void(0)" className="h1"><b>Management</b><br></br>Dashboard</a>
                    </div>
                    <div className="card-body mb-3 mt-3">
                        <div>
                            <div className="input-group mb-3">
                                <input
                                    onChange={(val: any) => onInputChange('email', val)}
                                    type="email"
                                    className={`form-control ${state.hasError && !state.email ? 'is-invalid' : ''}`}
                                    placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    onChange={(val: any) => onInputChange('password', val)}
                                    type="password"
                                    className={`form-control ${state.hasError && !state.password ? 'is-invalid' : ''}`}
                                    placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex mb-3 justify-content-between">
                                        { state.loginCreds && <p className={'text-danger'}>Check login credentials</p>}
                                        <Link to={'/forgot-password'} style={{textDecoration: "underline"}} className='float-right'>Forgot password</Link>
                                    </div>
                                    <button onClick={onLogin} type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;