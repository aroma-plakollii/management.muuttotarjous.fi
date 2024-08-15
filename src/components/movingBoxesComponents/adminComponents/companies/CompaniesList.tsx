import {useEffect, useState} from "react";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {deleteCompany} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Link} from "react-router-dom";
import {Loader} from "../../../../views/Loader";

const CompaniesList = () => {
    const [state, setState] = useState({
        companies: [],
        companyId: 0,
        loading: true,
        createMode: false,
        editMode: false,
        isDeleted: false,
    });

    const __init = async () => {
        const companies = await getCompanies();
        setState({...state, companies, isDeleted: false, loading: false})
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteCompany(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderCompanies = () => {
        return (
            state.companies.map((company: any) => (
                <tr key={company.id}>
                    <td>
                        {company.name}
                    </td>
                    <td>
                        {company.first_name} {company.last_name}
                    </td>
                    <td>
                        {company.email}
                        <br/>
                        {company.phone}
                    </td>
                    <td>
                        {company.address}
                        <br/>
                        {company.business_number}
                    </td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <Link to={`/companies/${company.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                            <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(company.id)}><i className="fas fa-trash"></i></a>
                        </div>
                    </td>
                </tr>
            ))
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Companies list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Owner Name</th>
                                        <th>E-mail/Phone</th>
                                        <th>Address/Business Nr.</th>
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
    );
}

export default CompaniesList;