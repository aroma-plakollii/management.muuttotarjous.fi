import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {sendPasswordResetEmail, generateResetToken} from "../services/ForgotPasswordService";
const ForgotPassword = () => {
    const [state, setState] = useState({email: '', hasError: false, emailIsValid: true});

    let navigate = useNavigate();

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            [key]: value
        })
    }

    const onForgotPassword = async (e : any) => {
        e.preventDefault();
        setState({...state, hasError: false, emailIsValid: true});

        if (
            !state.email
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const token = await generateResetToken(state.email);

            let res;

            if (typeof token === 'object' && token.hasOwnProperty('message') && token.message === 'Token has expired') {
                res = await sendPasswordResetEmail(state.email, 'expired');
            }
            else{
                res = await sendPasswordResetEmail(state.email, token);

                if (res.code === 'ERR_BAD_REQUEST'){
                    setState({
                        ...state,
                        hasError: true,
                        emailIsValid: false
                    })

                    return;
                }

                navigate('/login');
            }
        }
    }

    return (
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="javascript:void(0)" className="h1"><b>Forgot</b>Password?</a>
                    </div>
                    <div className="card-body mb-3 mt-3">
                        <div>
                            <div className="input-group mb-3">
                                <p>Enter your registered email ID to reset the password</p>
                                <input type="email" id="email" className={`form-control ${state.hasError && !state.email ? 'is-invalid' : ''}`} name="email"
                                       placeholder="Enter Your Email"  onChange={(val: any) => onInputChange('email', val)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={onForgotPassword}>
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword