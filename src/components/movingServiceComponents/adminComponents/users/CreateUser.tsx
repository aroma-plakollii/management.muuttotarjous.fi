import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUser, getRoles} from "../../../../services/movingServiceServices/adminServices/UserService";
import {IRole} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IRole";
import {IUser} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IUser";
import {Company} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingServiceServices/adminServices/CompaniesService";
import {Loader} from "../../../../views/Loader";
import {service} from "../../../../services/AuthenticationService";

const CreateUser = () => {
    const [state, setState] = useState({
        user: {} as IUser,
        roles: [] as IRole[],
        companies: [] as Company[],
        loading: true,
        hasError: false,
    });

    let navigate = useNavigate();

    useEffect(() => {

        const __init = async () => {
            const roles = await getRoles();
            const companies = await getCompanies();
            setState({...state, roles, companies, loading: false });
        }

        __init();
    }, [])

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, user: {
                ...state.user,
                [key]: value
            }
        })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, user: {
                ...state.user,
                        [key]: value
                }
        });
    };

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.user.name ||
            !state.user.email ||
            !state.user.password
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const data = {
                service: service,
                role_id: state.user.role_id,
                ms_company_id: state.user.ms_company_id,
                name: state.user.name,
                email: state.user.email,
                password: state.user.password,
            }
            const res = await createUser(data);

            if (res) {
                navigate('/users');
            }
        }
    };

    const renderRoles = () => {
        return(
            state.roles.map(role => (
                <option value={role.id} key={role.id}>{role.name}</option>
            ))
        )
    }

    const renderCompanies = () => {
        return(
            state.companies.map(company => (
                <option value={company.id} key={company.id}>{company.name}</option>
            ))
        )
    }

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    return <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">User Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label htmlFor="first_name" className="col-sm-3 col-form-label">User Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.user.name ? 'is-invalid' : ''}`} id="name"
                                                    placeholder="Name" onChange={(val: any) => onInputChange('name', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.user.email ? 'is-invalid' : ''}`} id="email"
                                                    placeholder="Email" onChange={(val: any) => onInputChange('email', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-sm-3 col-form-label">Password</label>
                                            <div className="col-sm-9">
                                                <input type="password" className={`form-control ${state.hasError && !state.user.password ? 'is-invalid' : ''}`} id="password"
                                                    placeholder="Password" onChange={(val: any) => onInputChange('password', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="service" className="col-sm-3 col-form-label">Service</label>
                                            <div className="col-sm-9">
                                                <select
                                                    name="service"
                                                    id="service"
                                                    disabled
                                                    className={`form-control`}
                                                    onChange={(val: any) => onSelectChange('service', val)}
                                                    value={service ? service.toString() : 'moving-service'}
                                                >
                                                    <option value={'moving-service'}>Moving Service</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="type" className="col-sm-3 col-form-label">Role</label>
                                            <div className="col-sm-9">
                                                <select
                                                    name="type"
                                                    id="type"
                                                    className={`form-control`}
                                                    onChange={(val: any) => onSelectChange('role_id', val)}
                                                    value={state.user.role_id}
                                                >
                                                    <option value={''}>-- Choose role --</option>
                                                        {renderRoles()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="ms_company_id" className="col-sm-3 col-form-label">Company</label>
                                            <div className="col-sm-9">
                                                <select
                                                    name="ms_company_id"
                                                    id="ms_company_id"
                                                    className={`form-control`}
                                                    onChange={(val: any) => onSelectChange('ms_company_id', val)}
                                                    value={state.user.ms_company_id}
                                                >
                                                    <option value={''}>-- Choose company --</option>
                                                    {renderCompanies()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={onCreate}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                        <Link to={'/users'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
};

export default CreateUser;
