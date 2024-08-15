import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/companyInterfaces/ICompany";
import {getMbCompanyId} from "../../../../config";
import {getCompany} from "../../../../services/movingBoxesServices/companyServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const CompaniesList = () => {

    const [state, setState] = useState({
        company: {} as Company,
        companyId: '',
        loading: true,
        createMode: false,
        editMode: false,
    });

    useEffect(()=> {
        const __init = async () => {
            const id = getMbCompanyId();
            const company = await getCompany(id);
            setState({...state, company, loading: false, companyId: id})
        }

        __init()
    },[]);

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
                                        <tr key={state.company.id}>
                                            <td>
                                                {state.company.name}
                                            </td>
                                            <td>
                                                {state.company.first_name} {state.company.last_name}
                                            </td>
                                            <td>
                                                {state.company.email}
                                                <br/>
                                                {state.company.phone}
                                            </td>
                                            <td>
                                                {state.company.address}
                                                <br/>
                                                {state.company.business_number}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompaniesList;