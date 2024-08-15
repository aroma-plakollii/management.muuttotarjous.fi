import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Loader} from "../../../../views/Loader";
import {IRegion} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IRegion";
import {getRegion, saveRegionDetails} from "../../../../services/movingServiceServices/adminServices/RegionService";

const EditRegion = () => {
    const [state, setState] = useState({
        region: {} as IRegion,
        loading: true,
        hasError: false,
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const region = await getRegion(id);

            setState({...state, region, loading: false});
        }

        __init();
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, region: {
                ...state.region,
                [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        const data = {
            name: state.region.name,
        }

        const res = await saveRegionDetails(id, data);

        if (res) {
            setState({...state, loading: false})
            navigate('/regions')
        }
    };

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Region Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Region name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="name"
                                                       placeholder="fi" onChange={(val: any) => onInputChange('name', val)} defaultValue={state.region.name}/>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                        <Link to={'/regions'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditRegion;