import {useEffect, useState} from "react";
import {deleteCity, getCitiesByCompany} from "../../../../services/movingBoxesServices/companyServices/CitiesService";
import {Link} from "react-router-dom";
import {getMbCompanyId} from "../../../../config";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/companyInterfaces/ICompany";
import {getCompany} from "../../../../services/movingBoxesServices/companyServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const CitiesList = () => {

    const [state, setState] = useState({
        cities: [],
        company: {} as Company,
        companyId: getMbCompanyId(),
        loading: true,
        isDeleted: false,
    });

    const __init = async () => {
        const cities = await getCitiesByCompany(state.companyId);
        const company = await getCompany(state.companyId);
        setState({...state, cities, company, loading: false})
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteCity(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderPrices = () => {
        return (
            state.cities.map((city: any) => {

                return(
                    <tr key={city.id}>
                        <td>{state.company.name}</td>
                        <td>{city.name}</td>
                        <td>{city.price}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/cities/${city.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(city.id)}><i className="fas fa-trash"></i></a>
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
                                <h3 className="card-title text-uppercase">Cities list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>City name</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {renderPrices()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/cities/create'} className="btn btn-info">
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

export default CitiesList;