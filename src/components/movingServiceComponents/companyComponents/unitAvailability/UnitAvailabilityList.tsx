import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUnitAvailabilityByCompany} from "../../../../services/movingServiceServices/companyServices/UnitAvailabilityService";
import { deleteUnitAvailability } from "../../../../services/movingServiceServices/companyServices/UnitAvailabilityService";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import { Company } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {UnitAvailability} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitAvailability";
import {Loader} from "../../../../views/Loader";
import moment from "moment/moment";


const UnitAvailabilityList = () => {
    const [state, setState] = useState({
        unitsAvailability: [] as UnitAvailability[],
        company: {} as Company,
        loading: true,
        isDeleted: false,
    });

    const __init = async () => {
        const companyId = await getMsCompanyId();
        const unitsAvailability = await getUnitAvailabilityByCompany(companyId);
        const company = await getCompanyDetails(companyId);
        setState({...state, unitsAvailability, company, loading: false})
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteUnitAvailability(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderUnitsAvailability = () => {
        return (
            state.unitsAvailability.map((unitAvailability: any) => {

                return (
                    <tr key={unitAvailability.id}>
                        <td>
                            {unitAvailability.id}
                        </td>
                        <td>
                            {unitAvailability.unit_id}
                        </td>
                        <td>
                            {moment(unitAvailability.start_date).format('DD-MM-YYYY')}
                        </td>
                        <td>
                            {moment(unitAvailability.start_date).format('HH:mm')}
                        </td>
                        <td>
                            {moment(unitAvailability.end_date).format('HH:mm')}
                        </td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                {/*<Link to={`/units-availability/${unitAvailability.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>*/}
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(unitAvailability.id)}><i className="fas fa-trash"></i></a>
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
                                <h3 className="card-title text-uppercase">Blocked Units By Date List</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className='col-md-3'>Id</th>
                                        <th className='col-md-4'>Unit Id</th>
                                        <th className='col-md-4'>Date</th>
                                        <th className='col-md-4'>Start Time</th>
                                        <th className='col-md-4'>End Time</th>
                                        <th className='col-md-1'></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderUnitsAvailability()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/units-availability/create'} className="btn btn-info">
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

export default UnitAvailabilityList