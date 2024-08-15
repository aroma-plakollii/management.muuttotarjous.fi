import { useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getMsCompanyId} from "../../../../config";
import { addFreeCity } from "../../../../services/movingServiceServices/companyServices/FreeCitiesService";
import {Loader} from "../../../../views/Loader";

const CreateFreeCity = () => {
    const [state, setState] = useState({
        name: '',
        company_id: null,
        loading: true,
        hasError: false,
    });

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const company_id = await getMsCompanyId();
            setState({...state, company_id, loading: false});
        }

        __init();
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, name: value
        })
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (!state.name){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const data = {
                name: state.name,
                company_id: state.company_id,
            }

            const res = await addFreeCity(data);

            if (res) {
                navigate('/free-cities');
            }
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
                                                className={`form-control ${
                                                    state.hasError && !state.name ? "is-invalid" : ""
                                                }`}
                                                type="text"
                                                id="city"
                                                placeholder="Helsinki"
                                                onChange={(val: any) => onInputChange('name', val)}
                                                value={state.name}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/free-cities'} className="btn btn-default float-right">Cancel</Link>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFreeCity