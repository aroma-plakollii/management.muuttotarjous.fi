import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { getUserDetails, saveUserDetails } from "../../../../services/movingBoxesServices/adminServices/UserService";
import {getRoles} from "../../../../services/movingBoxesServices/adminServices/UserService";
import {IUser} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/IUser";
import {IRole} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/IRole";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const EditUser = () => {

    const [state, setState] = useState({
        userDetails: {} as IUser,
        roles: [] as IRole[],
        companies: [] as Company[],
        loading: true,
        hasError: false,
    });
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const user = await getUserDetails(id);
            const roles = await getRoles();
            const companies = await getCompanies();

            setState({...state, userDetails: user, roles, companies, loading: false});
        }

        __init();
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, userDetails: {
                ...state.userDetails, [key]: value
            }
        });
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, userDetails: {
                ...state.userDetails,
                [key]: value
            }
        });
    };

    const onSave = async (id: any) => {

        const res = await saveUserDetails(id, state.userDetails);

        if (res) {
            setState({...state, loading: false})
            navigate('/users')
        }
    };

    const renderRoles = () => {
        return (
            state.roles
                .filter(role => role.name === 'admin' || role.name === 'company')
                .map(role => (
                    <option value={role.id} key={role.id}>
                        {role.name}
                    </option>
                ))
        );
    };

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
                                    {/*<Link to={`/users/reset-password/${state.userDetails.id}`} className="float-right text-dark" style={{textDecoration: "underline"}}>Reset password</Link>*/}
                                    <a></a>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label htmlFor="first_name" className="col-sm-3 col-form-label">User name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="name"
                                                    placeholder="Name" onChange={(val: any) => onInputChange('name', val)} defaultValue={state.userDetails.name}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="email"
                                                    placeholder="Email" onChange={(val: any) => onInputChange('email', val)} defaultValue={state.userDetails.email}/>
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
                                                    value={state.userDetails.role_id}
                                                >
                                                    <option value={''}>-- Choose role --</option>
                                                    {renderRoles()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="mb_company_id" className="col-sm-3 col-form-label">Company</label>
                                            <div className="col-sm-9">
                                                <select
                                                    name="mb_company_id"
                                                    id="mb_company_id"
                                                    className={`form-control`}
                                                    onChange={(val: any) => onSelectChange('mb_company_id', val)}
                                                    value={state.userDetails.mb_company_id}
                                                >
                                                    <option value={''}>-- Choose company --</option>
                                                    {renderCompanies()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
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

export default EditUser;
