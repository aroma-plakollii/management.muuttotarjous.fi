import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteUser, getRoles} from "../../../../services/movingBoxesServices/adminServices/UserService";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {IRole} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/IRole";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {Loader} from "../../../../views/Loader";
import {getUsersByService} from "../../../../services/AuthenticationService";
import {service} from "../../../../services/AuthenticationService";

const UsersList = () => {
    const [state, setState] = useState({
        users: [],
        roles: [] as IRole[],
        companies: [] as Company[],
        isDeleted: false,
        loading: true,
    });

    const __init = async () => {
        const data = {
            service: service
        }
        const users = await getUsersByService(data);
        const roles = await getRoles();
        const companies = await getCompanies();
        setState({...state, users, roles, companies, loading: false});
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteUser(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

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
                                    <h3 className="card-title text-uppercase">Users list</h3>
                                </div>

                                <div className="card-body table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>User name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Company</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                state.users.map((user: any) => {
                                                    const role = state.roles.find((role) => role.id === user.role_id);
                                                    const company = state.companies.find((company) => company.id === user.mb_company_id);
                                                    const roleName = role ? role.name : 'Unknown Role';
                                                    const companyName = company ? company.name : '';

                                                return <tr>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td className='text-capitalize'>{roleName}</td>
                                                            <td className='text-capitalize'>{companyName}</td>
                                                            <td>
                                                                <div className="btn-group btn-group-sm">
                                                                    <Link to={`/users/${user.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                                                                    <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(user.id)}><i className="fas fa-trash"></i></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                            })}
                                        
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card-footer">
                                    <Link to={'/users/create'} className="btn btn-info">
                                        Create new
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
};

export default UsersList;
