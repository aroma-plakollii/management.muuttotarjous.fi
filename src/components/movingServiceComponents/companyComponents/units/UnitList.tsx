import {useEffect, useState} from "react";
import { getUnitsByCompany, deleteUnit } from "../../../../services/movingServiceServices/companyServices/UnitService";
import {getMsCompanyId} from "../../../../config";
import {Link} from "react-router-dom";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Loader} from "../../../../views/Loader";
import {IRegion} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IRegion";
import {getRegions} from "../../../../services/movingServiceServices/companyServices/RegionService";

const UnitList = () => {
    const [state, setState] = useState({
        units: [] as Unit[],
        regions: [] as IRegion[],
        loading: true,
        isDeleted: false,
    });

    const __init = async () => {
        const companyId = await getMsCompanyId()
        const units = await getUnitsByCompany(companyId);
        const regions = await getRegions();
        setState({...state, units, regions, loading: false});
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteUnit(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderUnits = () => {
        return (
            state.units.map((unit: any) => {
                const region = state.regions.find((region) => region.id === unit.region_id);
                const regionName = region ? region.name : 'Unknown Region';

                return (
                    <tr key={unit.id}>
                        <td>{unit.id}</td>
                        <td>{regionName}</td>
                        <td>{unit.name}</td>
                        <td>{unit.address}</td>
                        <td>{unit.price}</td>
                        <td>{unit.persons}</td>
                        <td>{unit.capacity}</td>
                        <td>
                        <span
                            className={` fas fa-circle ${unit.availability == 1 ? 'text-success' : 'text-danger'}`}></span>
                        </td>
                        <td>{unit.max_shift}</td>
                        <td>{unit.start_time}</td>
                        <td>{unit.end_time}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/unit/products/${unit.id}`} className="btn btn-warning"><i
                                    className="fas fa-plus"></i></Link>
                            </div>
                        </td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/unit/${unit.id}`} className="btn btn-warning"><i
                                    className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(unit.id)}><i
                                    className="fas fa-trash"></i></a>
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
                                <h3 className="card-title text-uppercase">Unit list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Region</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Persons</th>
                                        <th>Capacity</th>
                                        <th>Availability</th>
                                        <th>Max Shift</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Add Price to Products</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {renderUnits()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/unit/create'} className="btn btn-info">
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

export default UnitList