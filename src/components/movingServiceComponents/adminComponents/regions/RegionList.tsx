import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AlertConfirm from "../shared/AlertConfirm";
import {Loader} from "../../../../views/Loader";
import {IRegion} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IRegion";
import {deleteRegion, getRegions} from "../../../../services/movingServiceServices/adminServices/RegionService";

const RegionList = () => {
    const [state, setState] = useState({
        regions: [] as IRegion[],
        loading: true,
        isDeleted: false,
        alertOpen: false,
        deleteRegionId: 0
    });

    const __init = async () => {
        const regions = await getRegions();;
        setState({...state, regions, loading: false});
    }

    const onDelete = async (id: number) => {
        setState({...state, alertOpen: true, deleteRegionId: id});
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await deleteRegion(state.deleteRegionId);

            if (isDeleted) {
                setState({...state, isDeleted: true, alertOpen: false, deleteRegionId: 0});
            }
        } else if(confirm === 'cancel'){
            setState({...state, alertOpen: false, deleteRegionId: 0});
        }
    }

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderRegions = () => {
        return (
            state.regions.map((region: any) => {

                return (
                    <tr key={region.id}>
                        <td>{region.id}</td>
                        <td>{region.name}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/regions/${region.id}`} className="btn btn-warning"><i
                                    className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(region.id)}><i className="fas fa-trash"></i></a>
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
                                <h3 className="card-title text-uppercase">Region list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Region name</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderRegions()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/regions/create'} className="btn btn-info">
                                    Create new
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {state.alertOpen && <AlertConfirm
                title={'You are deleting the region'}
                message={'Are you sure you want to delete the region?'}
                isOpen={state.alertOpen}
                onClose={onCloseAlert}
            />}
        </div>
    );
}

export default RegionList;