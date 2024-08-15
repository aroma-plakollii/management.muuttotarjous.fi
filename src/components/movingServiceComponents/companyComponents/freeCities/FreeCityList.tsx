import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFreeCityByCompany} from "../../../../services/movingServiceServices/companyServices/FreeCitiesService";
import {getMsCompanyId} from "../../../../config";
import { deleteFreeCity } from "../../../../services/movingServiceServices/companyServices/FreeCitiesService";
import {FreeCity} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IFreeCity";
import {Loader} from "../../../../views/Loader";

const FreeCityList = () => {
    const [state, setState] = useState({
        freeCities: [] as FreeCity[],
        loading: true,
        isDeleted: false,
    });

    const __init = async () => {
        const companyId = await getMsCompanyId()
        const freeCities = await getFreeCityByCompany(companyId);
        setState({...state, freeCities, isDeleted: false, loading: false});
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteFreeCity(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderFreeCities = () => {
        return (
            state.freeCities.map((freeCity: any) => {
 
                return (
                <tr key={freeCity.id}>
                    <td>
                        {freeCity.id}
                    </td>
                    <td>
                        {freeCity.name}
                    </td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <Link to={`/free-cities/${freeCity.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                            <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(freeCity.id)}><i className="fas fa-trash"></i></a>
                        </div>
                    </td>
                </tr>
            )})
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
                                <h3 className="card-title text-uppercase">Free Transport Cities List</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className="col-md-5">Id</th>
                                        <th className="col-md-5">City</th>
                                        <th className="col-md-2"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderFreeCities()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/free-cities/create'} className="btn btn-info">
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

export default FreeCityList