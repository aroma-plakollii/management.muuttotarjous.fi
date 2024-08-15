import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { getFreeCityDetails } from "../../../../services/movingServiceServices/companyServices/FreeCitiesService";
import { saveFreeCityDetails } from "../../../../services/movingServiceServices/companyServices/FreeCitiesService";
import { FreeCity } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IFreeCity";
import {Loader} from "../../../../views/Loader";

const EditFreeCity = () => {
    const [state, setState] = useState({
        freeCity: {} as FreeCity,
        hasError: false,
        loading: true,
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const freeCity = await getFreeCityDetails(id);
            setState({...state, freeCity, loading: false});
        }

        __init();
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, freeCity: {
                ...state.freeCity,
                [key]: value
            }
        })
    }

    const onSave = async (id: any) => {

        const res = await saveFreeCityDetails(id, state.freeCity);

        if (res) {
            setState({...state, loading: false});
            navigate('/free-cities');
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
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Free Cities Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">City Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                className={`form-control`}
                                                type="text"
                                                id="name"
                                                defaultValue={state.freeCity.name}
                                                onChange={(val: any) => onInputChange('name', val)}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/free-cities'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditFreeCity