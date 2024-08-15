import {useEffect, useState} from "react";
import {deleteBlockedDates, getBlockedDates} from "../../../../services/movingBoxesServices/adminServices/BlockedDatesService";
import {Link} from "react-router-dom";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {Loader} from "../../../../views/Loader";

const BlockedDatesList = () => {
    const [state, setState] = useState({
        blockedDates: [],
        companies: [] as Company[],
        loading: true,
        isDeleted: false,
    });

    const __init = async () => {
        const blockedDates = await getBlockedDates();
        const companies = await getCompanies()
        setState({...state, blockedDates, companies, loading: false})
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteBlockedDates(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderPrices = () => {
        return (
            state.blockedDates.map((item: any) => {

                const company = state.companies.find((company) => company.id === item.company_id);
                const companyName = company ? company.name : '';

                return(
                    <tr key={item.id}>
                        <td>{companyName}</td>
                        <td>{item.date}</td>
                        <td>{item.status ? <span className="badge bg-danger">Closed</span> : <span className="badge bg-success">Open</span>}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/blocked-dates/${item.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(item.id)}><i className="fas fa-trash"></i></a>
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Blocked Dates list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {renderPrices()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/blocked-dates/create'} className="btn btn-info">
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

export default BlockedDatesList;