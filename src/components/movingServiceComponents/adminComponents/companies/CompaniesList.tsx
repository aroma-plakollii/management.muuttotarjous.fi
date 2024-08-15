import moment from "moment";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCompanies, deleteCompany} from "../../../../services/movingServiceServices/adminServices/CompaniesService";
import {Company} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/ICompany";
import AlertConfirm from "../shared/AlertConfirm";
import { role } from '../../../../services/AuthenticationService'
import {Loader} from "../../../../views/Loader";

const CompaniesList = () => {
    const [state, setState] = useState({
        companies: [] as Company[],
        loading: true,
        isDeleted: false,
        alertOpen: false,
        deleteProductId: 0
    });

    const onDelete = async (id: number) => {
        setState({...state, alertOpen: true, deleteProductId: id});
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await deleteCompany(state.deleteProductId);

            if (isDeleted) {
                setState({...state, isDeleted: true, alertOpen: false, deleteProductId: 0});
            }
        } else if(confirm === 'cancel'){
            setState({...state, alertOpen: false, deleteProductId: 0});
        }
    }

    useEffect(()=> {
        const __init = async () => {
            const companies = await getCompanies();

            setState({...state, companies, loading: false})
        }

        __init()

    }, [state.isDeleted]);

    const renderCompanies = () => {
        return (
            state.companies.map((company: any) => {

                return (
                    <tr>
                        <td>
                            {company.id}
                        </td>
                        <td>
                            {company.name}
                        </td>
                        <td>
                            {company.business_number}
                        </td>
                        <td>
                            {company.first_name} {company.last_name}
                        </td>
                        <td>
                            {company.email}
                        </td>
                        <td>
                            {company.phone}
                        </td>
                        <td>
                            {company.address}
                        </td>
                        <td>
                            {moment(company.register_date).format('YYYY-MM-DD')}
                        </td>
                        <td>
                            <span className={`text-warning ${ company.is_featured == 1 ? 'fas fa-star' : 'far fa-star'}`}></span>
                        </td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/companies/${company.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(company.id)}><i className="fas fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                )
            })
        );
    }

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    return (
        <div className="content-header">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Companies list</h3>
                                </div>

                                <div className="card-body table-responsive">
                                    <table className="table table-striped text-nowrap">
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Business number</th>
                                            <th>Owner</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Register date</th>
                                            <th>Recommended</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {renderCompanies()}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card-footer">
                                    <Link to={'/companies/create'} className="btn btn-info">
                                        Create new
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {state.alertOpen && <AlertConfirm
                title={'You are deleting the company'}
                message={'Are you sure you want to delete the company?'}
                isOpen={state.alertOpen}
                onClose={onCloseAlert}
            />}
        </div>
    );
}

export default CompaniesList;