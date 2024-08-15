import moment from "moment";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCompanyDetails} from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Loader} from "../../../../views/Loader";


const CompanyDetails = () => {
    const [state, setState] = useState({
        company: {} as Company,
        loading: true,
    });

    useEffect(()=> {
        const __init = async () => {
            const companyId = await getMsCompanyId()
            const company = await getCompanyDetails(companyId);

            setState({...state, company, loading: false})
        }

        __init()

    }, []);

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
                                            <tr>
                                                <td>
                                                    {state.company.id}
                                                </td>
                                                <td>
                                                    {state.company.name}
                                                </td>
                                                <td>
                                                    {state.company.business_number}
                                                </td>
                                                <td>
                                                    {state.company.first_name} {state.company.last_name}
                                                </td>
                                                <td>
                                                    {state.company.email}
                                                </td>
                                                <td>
                                                    {state.company.phone}
                                                </td>
                                                <td>
                                                    {state.company.address}
                                                </td>
                                                <td>
                                                    {moment(state.company.register_date).format('YYYY-MM-DD')}
                                                </td>
                                                <td>
                                                    <span className={`text-warning ${ state.company.is_featured == 1 ? 'fas fa-star' : 'far fa-star'}`}></span>
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <Link to={`/companies/${state.company.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card-footer">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetails;