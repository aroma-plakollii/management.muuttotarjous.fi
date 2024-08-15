import {useEffect, useState} from "react";
import {deleteCity, getCities} from "../../../../services/movingBoxesServices/adminServices/CitiesService";
import {Link} from "react-router-dom";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";

const CitiesList = () => {
    const [state, setState] = useState({
        cities: [],
        companies: [] as Company[],
        loading: false,
        isDeleted: false,
    });

    const __init = async () => {
        const cities = await getCities();
        const companies = await getCompanies();
        setState({...state, cities, companies})
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

                const company = state.companies.find((company) => company.id === city.company_id);
                const companyName = company ? company.name : '';

                return(
                    <tr key={city.id}>
                        <td>{companyName}</td>
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